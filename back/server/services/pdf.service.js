const { randomUUID } = require('crypto');
const constants = require('./../assets/constants');
const { PDFDocument, rgb, PageSizes, StandardFonts, BlendMode } = require('pdf-lib');
const fs = require('fs').promises;
const moment = require('moment-timezone');

class PdfService {
  
  constructor() {
    this.pdf = null;
    this.pages = [];
  }

  BuildClientAddress = function(address) {
    if(!!address) return address.street + " #" + address.externalNumber + (!!address.internalNumber ? (" int. " + address.internalNumber) : "")
    return '';
  }

  GenerateOrderResume = async function(order) {
    try {
        this.pdf = await PDFDocument.create();
        await this.GenerateOrderResumePdf(order);

        const pdfBytes = await this.pdf.save();
        return pdfBytes;
    } catch (err) {
        throw err
    }
  }
  
  GenerateOrderResumePdf = async function(order) {
    const sizes = PageSizes.Letter;
    const font = await this.pdf.embedFont(StandardFonts.TimesRoman);
    const page = this.pdf.addPage(sizes);
    const pageWidth = sizes[0];
    const pageHeight = sizes[1];
    const now = moment().tz(constants.timezone);
    let texts;

    let currentX = 0, currentY = 0;
    try {
        // ------------------------- Print pdf Header ------------------------- //
        const logo = await fs.readFile(`server/assets/img/pdf-icon.jpg`);
        currentX += 20;
        page.drawImage(await this.pdf.embedJpg(logo), {
            x: currentX,
            y: pageHeight - 100 - 15,
            width: 115,
            height: 75
        });
        texts = [
            `Contacto\n`,
            `Guillermo Lúa / Humberto Lúa\n`,
            `Cel. 3331323279\n`,
            `Tel. 23.05.01.35\n`,
            `Mail.\n`,
            `ventas_hlua@hotmail.com\n`,
            `ventas_glua@gmail.com\n`,
        ];
        currentX += 115 + 5;
        page.drawText(texts.join(''), {
            font,
            x: currentX,
            y: pageHeight - 40,
            maxWidth: 200,
            lineHeight: 18,
            size: 12
        });
        texts = [
            `Cliente: ${order.client.name}\n`,
            `Fecha: ${moment(order.date).tz(constants.timezone).format('DD/MM/YYYY')}\n`,
            `Contacto:\n`,
            `Domicilio: ${this.BuildClientAddress(order.clientAddress)}\n`,
            `Ciudad: ${order.clientAddress.city}\n`,
            `Telefono:\n`,
            `Documento:\n`,
            `Valor: $${order.total}\n`,
            `Condiciones: contado\n`,
        ];
        currentX += 180;
        page.drawText(texts.join(''), {
            font,
            x: currentX,
            y: pageHeight - 40,
            maxWidth: 130,
            lineHeight: 15,
            size: 12,
        });
        // ------------------------- End pdf Header ------------------------- //
        // ------------------------- Table of items ------------------------- //
        let separations = [85, 60, 140, 95, 85, 105];
        let headers = [`Unidad`, `Cant.`, `Producto`, `Precio`, `Importe`, `Observaciones`];
        let cellHeight = 20;
        currentX = 20;
        currentY = 200;

        separations.forEach((separation, idx) => {
            const text = headers[idx];
            page.drawRectangle({
                x: currentX,
                y: pageHeight - currentY,
                width: separation,
                height: -cellHeight,
                borderWidth: 2,
                opacity: 0
            });
            page.drawText(text, {
                font,
                x: currentX + 5,
                y: pageHeight - (currentY + cellHeight - 5),
                maxWidth: separation - 10,
                size: 14
            });
            currentX += separation;
        });
        
        currentY += cellHeight + 5;
        order.items.forEach(item => {
            currentX = 20;
            let content = [
                `${item.product.salesMeasurementType.abrev}`,
                `${item.weight}`,
                item.product.name,
                `$${Number(item.product.price).toFixed(2)}`,
                `$${Number(item.total).toFixed(2)}`,
                `${order.comments ? order.comments : ''}`,
            ];
            separations.forEach((separation, idx) => {
                const text = content[idx];
                page.drawRectangle({
                    x: currentX,
                    y: pageHeight - currentY,
                    width: separation,
                    height: -cellHeight,
                    borderWidth: 1,
                    opacity: 0
                });
                page.drawText(text, {
                    font,
                    x: currentX + 5,
                    y: pageHeight - (currentY + cellHeight - 6),
                    maxWidth: separation - 10,
                    size: 12
                });
                currentX += separation;
            });
            currentY += cellHeight;
        });
        // ------------------------- End table of items ------------------------- //
        // ------------------------- Footer ------------------------- //
        currentY = 20;
        currentX = 20;
        page.drawText(`Firma de recibido:`, {
            font,
            x: 300,
            y: currentY,
            maxWidth: 100,
            size: 12,
        });
        page.drawLine({
            start: {x: 400, y: currentY},
            end: {x: pageWidth - 20, y: currentY},
            thickness: 1,
        });
        currentY += 50;
        page.drawText(`Nombre:`, {
            font,
            x: 300,
            y: currentY,
            maxWidth: 100,
            size: 12
        });
        page.drawText(`${order.client.name}`, {
            font,
            x: 400,
            y: currentY,
            maxWidth: pageWidth - 20 - 400 - 20,
            size: 12
        });
        currentY += 80;
        page.drawText(`Pagaré suscrito en la fecha ${now.format('DD/MM/YYYY')} en el Domicilio ${this.BuildClientAddress(order.clientAddress)} en la ciudad de ${order.clientAddress.city}. Debo y pagaré a la orden de Guillermo Lúa Estrada en esta ciudad de Guadalajara, Jalisco, en la Fecha ${now.format('DD/MM/YYYY')} la cantidad de $${order.total} como valor de las mercancías recibidas a mi entera satisfacción. Después de la Fecha ${now.format('DD/MM/YYYY')}, este pagaré causará el 5% de interés mensual moratorio. Este pagaré es mercantil y está regido por la Ley General de Títulos y Operaciones de Crédito en su Art. 170 y 173 parte final y artículos correlativos por no ser pagaré domiciliado`,
            {
                font,
                x: currentX,
                y: currentY,
                maxWidth: pageWidth - 40,
                size: 10,
                lineHeight: 12,
            }
        );
        currentY += 15;
        page.drawLine({
            start: {x: 20, y: currentY},
            end: {x: pageWidth - 20, y: currentY},
            thickness: 1,
        });
        currentY += 5;
        page.drawText(`${now.format('hh:mm:ss a')}`, {
            font,
            x: currentX + 10,
            y: currentY,
            size: 12,
            lineHeight: 15,
        });
        currentY += 20;
        page.drawText(`TOTAL`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] - font.widthOfTextAtSize(`TOTAL`, 14),
            y: currentY,
            size: 14,
        });
        page.drawText(`$${order.total.toFixed(2)}`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] + separations[4] - font.widthOfTextAtSize(`$${order.total.toFixed(2)}`, 12),
            y: currentY,
            size: 12,
        });
        currentY += 20;
        page.drawText(`16%`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] - font.widthOfTextAtSize(`16%`, 12),
            y: currentY,
            size: 12,
        });
        page.drawText(`$${order.taxes.toFixed(2)}`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] + separations[4] - font.widthOfTextAtSize(`$${order.taxes.toFixed(2)}`, 12),
            y: currentY,
            size: 12,
        });
        currentY += 15;
        page.drawText(`I.V.A.`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] - font.widthOfTextAtSize(`I.V.A.`, 12),
            y: currentY,
            size: 12,
        });
        currentY += 13;
        page.drawLine({
            start: {x: 20, y: currentY},
            end: {x: pageWidth - 20, y: currentY},
            thickness: 2,
        });
        currentY += 7;
        page.drawText(`Subtotal`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] - font.widthOfTextAtSize(`Subtotal`, 12),
            y: currentY,
            size: 12,
        });
        page.drawText(`$${order.subtotal.toFixed(2)}`, {
            font,
            x: currentX + separations[0] + separations [1] + separations[2] + separations[3] + separations[4] - font.widthOfTextAtSize(`$${order.subtotal.toFixed(2)}`, 12),
            y: currentY,
            size: 12,
        });
        // ------------------------- End Footer ------------------------- //
    } catch (err) {
        throw err;
    }
  }

}

module.exports = PdfService;