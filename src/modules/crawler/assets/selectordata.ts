export const lightOjSelectors = [
  { key: 'title', selector: 'div.title' },
  { key: 'ojProblemId', selector: 'span.tag' },
  {
    key: 'timeLimit',
    selector: 'div:nth-child(1) > div.tooltip-trigger > span',
  },
  {
    key: 'memoryLimit',
    selector: 'div:nth-child(2) > div.tooltip-trigger > span',
  },
  { key: 'imageUrl', selector: 'div.markdown-body > p > img', attr: 'src' },
  {
    key: 'description',
    selector:
      'div[role="tabpanel"] > div > div > div.card-body > div > div:nth-child(1) > div.markdown-body',
  },
  {
    key: 'inputDesc',
    selector:
      'div[role="tabpanel"] > div > div > div.card-body > div > div:nth-child(2) > div.markdown-body',
  },
  {
    key: 'outputDesc',
    selector:
      'div[role="tabpanel"] > div > div > div.card-body > div > div:nth-child(3) > div.markdown-body',
  },
  {
    key: 'sampleInput',
    selector: 'table > tbody > tr > td:nth-child(1) > div > div > p',
  },
  {
    key: 'sampleOutput',
    selector: 'table > tbody > tr > td:nth-child(2) > div > div > p',
  },
];
