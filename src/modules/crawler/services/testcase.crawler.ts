import { Injectable } from '@nestjs/common';
import { helper } from '../../../shared/utils/helper';
import {
  INPUT_BUTTON_SELECTOR,
  INPUT_SELECTOR,
  OUTPUT_BUTTON_SELECTOR,
  OUTPUT_SELECTOR,
  UDEBUG_URL,
} from '../constant/testcase.crawler.constant';
import { BaseCrawler } from './baseCrawler';

@Injectable()
export class TestCaseCrawler extends BaseCrawler {
  async crawlTestCase(dto: any) {
    try {
      const { ojName, ojProblemId } = dto;
      const { browser, page } = await this.botLaunch({
        headless: 'new',
      });

      await page.goto(`${UDEBUG_URL}/${ojName}/${ojProblemId}`);

      await page.waitForSelector(INPUT_BUTTON_SELECTOR, { visible: true });

      await page.$eval(INPUT_BUTTON_SELECTOR, (element: any) =>
        element.click(),
      );
      // console.log('done...');

      await helper.timer(2000);

      await page.waitForSelector(INPUT_SELECTOR);

      const testInput = await this.getDataFromINPUTSelector(INPUT_SELECTOR);

      await page.click(OUTPUT_BUTTON_SELECTOR);
      await helper.timer(2000);

      await page.waitForSelector(OUTPUT_SELECTOR);

      const testOutput = await this.getDataFromINPUTSelector(OUTPUT_SELECTOR);

      await page.close();
      await browser.close();

      return {
        testInput,
        testOutput,
      };
    } catch (err: any) {
      console.log('error message ', err.message);
    }
  }
}

// new TestCaseCrawler().crawlTestCase({
//   ojName: 'LOJ',
//   ojProblemId: '1011',
// });
