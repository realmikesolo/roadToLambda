import moment from 'moment';
import { Languages, Types } from './order.types';

const WORKDAY = 9 * 3600 * 1000;

export class Order {
  private lang: string;
  private mimetype: string;
  private charCount: number;
  private date: moment.Moment;

  constructor(options: {
    lang: string;
    mimetype: string;
    charCount: number;
    date?: moment.Moment;
  }) {
    this.lang = options.lang;
    this.mimetype = options.mimetype;
    this.charCount = options.charCount;
    this.date = options.date ?? moment();
  }

  public get deadline(): number {
    let term = this.term;
    const date = moment(this.date);

    const addDays = date.weekday() === 6 ? 2 : date.weekday() === 0 ? 1 : 0;
    addDays
      ? date.add(addDays, 'd').hours(10).minutes(0).seconds(0)
      : date.hours() > 19
      ? date.add(1, 'd').hours(10).minutes(0).seconds(0)
      : date.hours() < 10
      ? date.hours(10).minutes(0).seconds(0)
      : date;

    const diff = moment(date).hours(19).minutes(0).seconds(0).valueOf() - date.valueOf();
    if (term > diff) {
      term = term - diff;
      date.add(1, 'd').hours(10).minutes(0).seconds(0);
    }

    const getDate = (date: moment.Moment, term: number): moment.Moment =>
      date.weekday() === 6 || date.weekday() === 0
        ? getDate(date.add(1, 'd'), term)
        : term < WORKDAY
        ? date.add(term, 'ms')
        : getDate(date.add(1, 'd'), term - WORKDAY);

    return getDate(date, term).valueOf();
  }

  public get price(): number {
    if (this.charCount < 1000) {
      return (this.isSpecialLang ? 50 : 120) * this.typeDiscount;
    } else {
      return +(this.charCount * (this.isSpecialLang ? 0.05 : 0.12) * this.typeDiscount).toFixed(2);
    }
  }

  public get term(): number {
    const minutes =
      ((this.charCount * 60) / (this.isSpecialLang ? 1333 : 333) + 30) * this.typeDiscount;

    return (minutes < 60 ? 60 : minutes) * 60 * 1000;
  }

  private get isSpecialLang(): boolean {
    return Languages[this.lang] === Languages.ru || Languages[this.lang] === Languages.ua;
  }

  private get typeDiscount(): number {
    return Types[this.mimetype] == null ? 1.2 : 1;
  }
}
