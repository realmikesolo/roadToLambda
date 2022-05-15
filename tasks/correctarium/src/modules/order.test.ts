import { expect } from 'chai';
import moment from 'moment';
import { Order } from './order.entity';

describe('order', () => {
  describe('get Price', () => {
    const data = [
      {
        input: { lang: 'ru', mimetype: '.doc', charCount: 900 },
        output: 50,
      },
      {
        input: { lang: 'en', mimetype: '.doc', charCount: 900 },
        output: 120,
      },
      {
        input: { lang: 'ru', mimetype: 'notype', charCount: 900 },
        output: 60,
      },
      {
        input: { lang: 'en', mimetype: 'notype', charCount: 900 },
        output: 144,
      },
      {
        input: { lang: 'ru', mimetype: '.doc', charCount: 1333 },
        output: 66.65,
      },
      {
        input: { lang: 'en', mimetype: '.doc', charCount: 1333 },
        output: 159.96,
      },
      {
        input: { lang: 'ru', mimetype: 'notype', charCount: 1333 },
        output: 79.98,
      },
      {
        input: { lang: 'en', mimetype: 'notype', charCount: 1333 },
        output: 191.95,
      },
    ];

    for (const { input, output } of data) {
      it(`GIVEN { lang: ${input.lang}, mimetype: ${input.mimetype}, charCount: ${input.charCount} }`, () => {
        const order = new Order(input);
        expect(order.price).eql(output);
      });
    }
  });

  describe('get Term', () => {
    const data = [
      {
        input: { lang: 'ru', mimetype: '.doc', charCount: 100 },
        output: 3600 * 1000,
      },
      {
        input: { lang: 'en', mimetype: '.doc', charCount: 100 },
        output: 3600 * 1000,
      },
      {
        input: { lang: 'ru', mimetype: 'notype', charCount: 100 },
        output: 3600 * 1000,
      },
      {
        input: { lang: 'en', mimetype: 'notype', charCount: 100 },
        output: 3600 * 1000,
      },
      {
        input: { lang: 'ru', mimetype: '.doc', charCount: 1333 },
        output: ((1333 * 60) / 1333 + 30) * 60_000,
      },
      {
        input: { lang: 'en', mimetype: '.doc', charCount: 333 },
        output: ((333 * 60) / 333 + 30) * 60_000,
      },
      {
        input: { lang: 'ru', mimetype: 'notype', charCount: 1333 },
        output: ((1333 * 60) / 1333 + 30) * 1.2 * 60_000,
      },
      {
        input: { lang: 'en', mimetype: 'notype', charCount: 333 },
        output: ((333 * 60) / 333 + 30) * 1.2 * 60_000,
      },
    ];

    for (const { input, output } of data) {
      it(`GIVEN { lang: ${input.lang}, mimetype: ${input.mimetype}, charCount: ${input.charCount} }`, () => {
        const order = new Order(input);
        expect(order.term).eql(output);
      });
    }
  });

  describe('get Deadline', () => {
    const data = [
      { input: { term: 1, date: '12/05/2022 09:00:00' }, output: '12/05/2022 11:30:00' },
      { input: { term: 1, date: '12/05/2022 10:00:00' }, output: '12/05/2022 11:30:00' },
      { input: { term: 1, date: '12/05/2022 11:00:00' }, output: '12/05/2022 12:30:00' },
      { input: { term: 1, date: '12/05/2022 19:00:00' }, output: '13/05/2022 11:30:00' },
      { input: { term: 1, date: '12/05/2022 20:00:00' }, output: '13/05/2022 11:30:00' },
      { input: { term: 10, date: '12/05/2022 10:00:00' }, output: '13/05/2022 11:30:00' },
      { input: { term: 1, date: '13/05/2022 09:00:00' }, output: '13/05/2022 11:30:00' },
      { input: { term: 1, date: '13/05/2022 10:00:00' }, output: '13/05/2022 11:30:00' },
      { input: { term: 1, date: '13/05/2022 11:00:00' }, output: '13/05/2022 12:30:00' },
      { input: { term: 1, date: '13/05/2022 19:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '13/05/2022 20:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 10, date: '13/05/2022 10:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '14/05/2022 09:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '14/05/2022 10:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '14/05/2022 11:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '14/05/2022 19:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '14/05/2022 20:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 10, date: '14/05/2022 10:00:00' }, output: '17/05/2022 11:30:00' },
      { input: { term: 1, date: '15/05/2022 09:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '15/05/2022 10:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '15/05/2022 11:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '15/05/2022 19:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 1, date: '15/05/2022 20:00:00' }, output: '16/05/2022 11:30:00' },
      { input: { term: 10, date: '15/05/2022 10:00:00' }, output: '17/05/2022 11:30:00' },
    ];

    for (const { input, output } of data) {
      it(`GIVEN { term: ${input.term}, date: ${input.date} }`, () => {
        const order = new Order({
          lang: 'ru',
          mimetype: '.doc',
          charCount: input.term * 1333,
          date: moment(input.date, 'DD/MM/YYYY HH:mm:ss'),
        });
        expect(order.deadline).eql(moment(output, 'DD/MM/YYYY HH:mm:ss').valueOf());
      });
    }
  });
});
