import { Injectable } from '@nestjs/common';
import { Page, PuppeteerLaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

@Injectable()
export class BaseCrawler {
  private page: Page;

  protected async botLaunch(options?: PuppeteerLaunchOptions) {
    const browser = await puppeteer.launch(options);
    this.page = await browser.newPage();
    this.page.setDefaultNavigationTimeout(50000);
    await this.page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
    );

    return {
      browser,
      page: this.page,
    };
  }

  protected async getDataFromHTMLSelector(selector: string, attr?: string) {
    return await this.page.evaluate(
      (selector, attr) => {
        const element = document.querySelector<HTMLElement>(selector);

        if (!element) {
          return null;
        }

        if (selector && attr) {
          return element.getAttribute(attr)?.trim();
        } else {
          return element.innerText?.trim();
        }
      },
      selector,
      attr,
    );
  }

  protected async getDataFromINPUTSelector(selector: string) {
    return await this.page.evaluate(
      (selector) => document.querySelector<HTMLInputElement>(selector)?.value,
      selector,
    );
  }
}
