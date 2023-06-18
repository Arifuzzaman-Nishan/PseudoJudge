import { Module } from '@nestjs/common';
import { PdfToTextService } from './services/pdftotext.service';

@Module({
  providers: [PdfToTextService],
  exports: [PdfToTextService],
})
export class PdfToTextModule {}
