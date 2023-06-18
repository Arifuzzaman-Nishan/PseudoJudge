import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { helper } from 'src/shared/utils/helper';
import { BaseCrawler } from './baseCrawler';
import { lightOjSelectors } from '../assets/selectordata';
import { PdfToTextService } from '../../pdf-to-text/services/pdftotext.service';
puppeteer.use(StealthPlugin());

// interface IProblemDetails {
//   pdfUrl?: string;
//   imageUrl?: string;
//   description?: {
//     problemDesc: string;
//     inputDesc: string;
//     outputDesc: string;
//   };
//   sampleDataset: {
//     sampleInput: string;
//     sampleOutput: string;
//   };
//   testDataset?: {
//     testInput: string;
//     testOutput: string;
//   };
//   limit: {
//     timeLimit: string;
//     memoryLimit?: string;
//   };
// }

// interface IProblemData {
//   title: string;
//   difficultyRating?: DifficultyRating;
//   ojName?: string;
//   ojProblemId: string;
//   ojUrl?: string;
//   problemDetails: IProblemDetails;
// }

@Injectable()
export class ProblemCrawler extends BaseCrawler {
  constructor(private readonly pdfToTextService: PdfToTextService) {
    super();
  }

  async crawlLightOJProblem(dto: any) {
    const { ojUrl } = dto;
    try {
      const { browser, page } = await this.botLaunch({
        headless: 'new',
      });
      await page.goto(ojUrl);
      await helper.timer(1000);

      const problemData: {
        [key: string]: string;
      } = {};

      await Promise.all(
        lightOjSelectors.map(async (item) => {
          problemData[item.key] = item?.attr
            ? await this.getDataFromHTMLSelector(item.selector, item.attr)
            : await this.getDataFromHTMLSelector(item.selector);
        }),
      );

      if (problemData.ojProblemId) {
        problemData.ojProblemId = problemData.ojProblemId.replace('LOJ-', '');
      }

      await page.close();
      await browser.close();

      return {
        title: problemData.title,
        ojProblemId: problemData.ojProblemId,
        problemDetails: {
          imageUrl: problemData?.imageUrl,
          description: {
            problemDesc: problemData.description,
            inputDesc: problemData.inputDesc,
            outputDesc: problemData.outputDesc,
          },
          sampleDataset: {
            sampleInput: problemData.sampleInput,
            sampleOutput: problemData.sampleOutput + '\n',
          },
          limit: {
            timeLimit: problemData.timeLimit,
            memoryLimit: problemData.memoryLimit,
          },
        },
      };
    } catch (err: any) {
      console.log('crawlLightOJProblem error is ', err.message);
    }
  }

  async crawlUvaProblem(dto: any) {
    try {
      const { browser, page } = await this.botLaunch({
        headless: 'new',
      });
      const { ojUrl } = dto;
      await page.goto(ojUrl);

      const title = await this.getDataFromHTMLSelector(
        'table > tbody > tr:nth-child(2) > td > h3',
      );

      const ojProblemId = title.match(/\d+/)[0];
      const timeLimit =
        (
          await this.getDataFromHTMLSelector(
            '#col3_content_wrapper > table > tbody > tr:nth-child(2) > td',
          )
        ).match(/Time limit: (.*)/)[1] ?? null;

      const pdfUrl = await page.evaluate(() => {
        return document
          .querySelector<HTMLIFrameElement>('#col3_content_wrapper > iframe')
          ?.src.replace('.html', '.pdf');
      });

      await page.close();
      await browser.close();

      const { sampleInput, sampleOutput } =
        await this.pdfToTextService.convertPdfToText(title, pdfUrl);

      return {
        title,
        ojProblemId,
        problemDetails: {
          pdfUrl,
          sampleDataset: {
            sampleInput,
            sampleOutput: sampleOutput + '\n',
          },
          limit: {
            timeLimit,
          },
        },
      };
    } catch (err: any) {
      console.log('crawlUvaProblem error is ', err.message);
    }
  }
}
