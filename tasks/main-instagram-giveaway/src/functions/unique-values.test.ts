import { expect } from 'chai';
import { uniqueValues } from './unique-values';

describe('instagram-giveaway/uniqueValues', () => {
  it('unique values', () => {
    expect(
      uniqueValues(
        [
          ['green', 'green', 'yellow'],
          ['black', 'black', 'black'],
        ].map((item) => item.join('\n')),
      ),
    ).eql(new Set(['green', 'yellow', 'black']));
  });
});
