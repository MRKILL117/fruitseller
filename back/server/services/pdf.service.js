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
            `Mail. ventas_hlua@hotmail.com\n`,
            `ventas_glua@gmail.com\n`,
        ];
        currentX += 115 + 5;
        page.drawText(texts.join(''), {
            x: currentX,
            y: pageHeight - 40,
            maxWidth: 200,
            lineHeight: 20,
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
            size: 12
        });
        // ------------------------- End pdf Header ------------------------- //
        

        // Save PDF in server
        const name = randomUUID();
        const pdfBytes = await this.pdf.save();
        await fs.writeFile(`server/files/orders-resumes/${name}.pdf`, pdfBytes);
        return {name, file: pdfBytes};
    } catch (err) {
        throw err;
    }
  }

}

module.exports = PdfService;