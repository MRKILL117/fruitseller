const constants = require('./../assets/constants');
const { PDFDocument, rgb, PageSizes } = require('pdf-lib');
const fs = require('fs').promises;

class PdfService {
  
  constructor() {
  }
  
  GenerateOrderResume = async function(order) {
    this.pdf = await PDFDocument.create();
    const page = this.pdf.addPage(PageSizes.Letter);

    // Print pdf Header
    const logo = await fs.readFile(`server/assets/img/pdf-icon.jpg`);
    page.drawImage(await this.pdf.embedJpg(logo), {
        x: 50,
        y: 50,
        width: 50
    });

    fs.writeFile('server/storage/')
  }

}

module.exports = PdfService;