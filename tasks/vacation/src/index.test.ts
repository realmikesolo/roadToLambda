import { expect } from 'chai';
import { transformData } from '.';

describe('vacation', () => {
  it('transformData', () => {
    expect(
      transformData([
        {
          _id: 'id',
          user: { _id: '602291efca744a001259baee', name: 'Snezhana Riazantseva' },
          usedDays: 1,
          startDate: '2021-12-13',
          endDate: '2021-12-13',
        },
        {
          _id: 'id',
          user: { _id: '602671015fe2cc0011b9f989', name: 'Ivan Pugach' },
          usedDays: 1,
          startDate: '2021-12-10',
          endDate: '2021-12-12',
        },
        {
          _id: 'id',
          user: { _id: '60c331ff1f37230011191058', name: 'Roman Nahryshko' },
          usedDays: 1,
          startDate: '2021-12-14',
          endDate: '2021-12-14',
        },
        {
          _id: 'id',
          user: { _id: '5f57b892b642eb0017808876', name: 'Dan Kochetov' },
          usedDays: 1,
          startDate: '2021-10-20',
          endDate: '2021-10-22',
        },
        {
          _id: 'id',
          user: { _id: '5f57b892b642eb0017808876', name: 'Dan Kochetov' },
          usedDays: 1,
          startDate: '2021-12-01',
          endDate: '2021-12-01',
        },
      ]),
    ).eql([
      {
        userId: '602291efca744a001259baee',
        name: 'Snezhana Riazantseva',
        weekendDates: [{ startDate: '2021-12-13', endDate: '2021-12-13' }],
      },
      {
        userId: '602671015fe2cc0011b9f989',
        name: 'Ivan Pugach',
        weekendDates: [{ startDate: '2021-12-10', endDate: '2021-12-12' }],
      },
      {
        userId: '60c331ff1f37230011191058',
        name: 'Roman Nahryshko',
        weekendDates: [{ startDate: '2021-12-14', endDate: '2021-12-14' }],
      },
      {
        userId: '5f57b892b642eb0017808876',
        name: 'Dan Kochetov',
        weekendDates: [
          { startDate: '2021-10-20', endDate: '2021-10-22' },
          { startDate: '2021-12-01', endDate: '2021-12-01' },
        ],
      },
    ]);
  });
});
