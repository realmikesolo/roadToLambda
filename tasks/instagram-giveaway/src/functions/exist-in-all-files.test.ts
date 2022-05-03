import { expect } from 'chai';
import { existInAllFiles } from './exist-in-all-files';

describe('instagram-giveaway/existInAllFiles', () => {
  const data = [
    {
      title: 'no duplicates',
      args: [
        ['repeatable', 'blue', 'yellow'],
        ['white', 'green', 'black'],
      ],
      expected: 0,
    },
    {
      title: '1 duplicate',
      args: [
        ['repeatable', 'blue', 'yellow'],
        ['white', 'repeatable', 'black'],
      ],
      expected: 1,
    },
    {
      title: '1 duplicate, but 1 record is repeated twice in 1 file',
      args: [
        ['repeatable', 'repeatable2', 'yellow'],
        ['repeatable', 'repeatable2', 'black'],
        ['orange', 'repeatable2', 'repeatable2'],
      ],
      expected: 1,
    },
    {
      title: '1 duplicate, but 1 record is repeated twice per file',
      args: [
        ['repeatable', 'repeatable', 'yellow'],
        ['repeatable', 'repeatable', 'black'],
        ['orange', 'repeatable', 'repeatable'],
      ],
      expected: 1,
    },
    {
      title: 'more than 1 duplicate',
      args: [
        ['repeatable', 'repeatable2', 'yellow'],
        ['repeatable', 'repeatable2', 'black'],
        ['orange', 'repeatable', 'repeatable2'],
      ],
      expected: 2,
    },
  ];

  for (const { title, args, expected } of data) {
    it(title, () => {
      expect(existInAllFiles(args.map((item) => item.join('\n')))).eql(expected);
    });
  }
});
