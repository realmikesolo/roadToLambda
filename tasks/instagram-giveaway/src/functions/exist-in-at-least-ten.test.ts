import { expect } from 'chai';
import { existInAtLeastTen } from './exist-in-at-least-ten';

describe('instagram-giveaway/existInAtLeastTen', () => {
  const data = [
    {
      title: 'no duplicates, not enough files',
      args: Array.from<Array<string>>({ length: 9 }).fill(['repeatable', 'blue', 'yellow']),
      expected: 0,
    },
    {
      title: 'duplicates exist, 10 files',
      args: Array.from<Array<string>>({ length: 10 }).fill(['repeatable', 'blue', 'yellow']),
      expected: 3,
    },
    {
      title: 'duplicates exist, more than 10 files',
      args: Array.from<Array<string>>({ length: 20 }).fill(['repeatable', 'blue', 'yellow']),
      expected: 3,
    },
  ];

  for (const { title, args, expected } of data) {
    it(title, () => {
      expect(existInAtLeastTen(args.map((item) => item.join('\n')))).eql(expected);
    });
  }
});
