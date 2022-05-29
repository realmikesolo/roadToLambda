import { Request, Response } from 'express';
import moment from 'moment';
import { Order } from './order.entity';

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const { language, mimetype, count } = (req.body ?? {}) as InputData;
    const order = new Order({ lang: language, mimetype, charCount: count });

    const outputData: OutputData = {
      price: order.price,
      time: Math.ceil(order.term / (3600 * 1000)),
      deadline: Math.ceil(order.deadline / 1000),
      deadline_date: moment(order.deadline).format('DD/MM/YYYY HH:mm:ss'),
    };

    res.status(201).send(outputData);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
}

type InputData = {
  language: string;
  mimetype: string;
  count: number;
};

type OutputData = {
  price: number;
  time: number;
  deadline: number;
  deadline_date: string;
};
