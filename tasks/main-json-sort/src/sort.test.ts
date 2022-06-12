import { expect } from 'chai';
import { sort } from './sort';

describe('json-sort', () => {
  it('sort', async () => {
    const result = await sort([
      'bad url',
      'https://jsonbase.com/lambdajson_type1/793',
      'https://jsonbase.com/lambdajson_type2/342',
      'https://jsonbase.com/lambdajson_type3/310',
      'https://jsonbase.com/lambdajson_type4/79',
    ]);
    expect(result).eql({ 'Значений True': 3, 'Значений False': 1 });
  });
});
