import { Module } from '@nestjs/common';
import { BaseCrawler } from './services/baseCrawler';
import { ProblemCrawler } from './services/problem.crawler';
import { TestCaseCrawler } from './services/testcase.crawler';
import { PdfToTextModule } from '../pdf-to-text/pdftotext.module';

@Module({
  imports: [PdfToTextModule],
  providers: [BaseCrawler, ProblemCrawler, TestCaseCrawler],
  exports: [ProblemCrawler, TestCaseCrawler],
})
export class CrawlerModule {}
