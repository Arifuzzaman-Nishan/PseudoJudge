import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';

@Injectable()
export class PdfToTextService {
  async convertPdfToText(title: string, pdfUrl: string) {
    const response = await axios.get(pdfUrl, {
      responseType: 'arraybuffer',
    });

    // Load the PDF document
    const pdf = await getDocument(new Uint8Array(response.data)).promise;

    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      // Get the text content from each page
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      // Extract strings line by line from each TextItem
      for (let j = 0; j < content.items.length; j++) {
        text += (content.items[j] as any).str + '\n';
      }
    }

    // Extract the required sections
    const inputMatch = text.match(/Sample Input([\s\S]*?)Sample Output/);
    const outputMatch = text.match(/Sample Output([\s\S]*?)$/); // Assumption: Sample Output is the last section

    let sampleInput = inputMatch ? inputMatch[1].trim() : '';
    let sampleOutput = outputMatch ? outputMatch[1].trim() : '';

    // Construct the regular expression.
    const regex = `/Universidad de Valladolid OJ: ${title} \d+\/\d+/`;

    sampleInput = sampleInput.replace(regex, '');
    sampleOutput = sampleOutput.replace(regex, '');

    return { sampleInput, sampleOutput };
  }
}
