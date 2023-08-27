const { randomUUID } = require('crypto');
const constants = require('./../assets/constants');
const { PDFDocument, rgb, PageSizes, StandardFonts, BlendMode } = require('pdf-lib');
const fs = require('fs').promises;
const moment = require('moment-timezone');

class PdfService {
  
  constructor() {
  }

  BuildClientAddress = function(address) {
    if(!!address) return address.street + " #" + address.externalNumber + (!!address.internalNumber ? (" int. " + address.internalNumber) : "")
    return '';
  }
  
  GenerateOrderResume = async function(order) {
    this.pdf = await PDFDocument.create();
    const sizes = PageSizes.Letter;
    const font = StandardFonts.TimesRoman;
    const page = this.pdf.addPage(sizes);
    const pageWidth = sizes[0];
    const pageHeight = sizes[1];
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
                `$${Number(item.total).toFixed(2)}`,
                `$${Number(item.price).toFixed(2)}`,
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
        page.drawLine({
            start: {x: 20, y: 200},
            end: {x: pageWidth - 20, y: 200},
            thickness: 2
        })
        // ------------------------- End Footer ------------------------- //
        

        // Save PDF in server
        const name = randomUUID();
        const pdfBytes = await this.pdf.save();
        await fs.writeFile(`server/files/orders-resumes/${name}.pdf`, pdfBytes);
        const parcialRoute = `/Files/orders-resumes/download/${name}.pdf`;
        return {path: parcialRoute, file: pdfBytes};
    } catch (err) {
        throw err;
    }
  }

}

module.exports = PdfService;