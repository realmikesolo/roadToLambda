import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import OrderModel from './order';
import ProductModel from './product';

@Table({ tableName: 'OrderDetails', timestamps: false })
export default class OrderDetailModel extends Model {
  @ForeignKey(() => OrderModel)
  @Column
  declare orderID: number;

  @ForeignKey(() => ProductModel)
  @Column
  declare productID: number;

  @Column('decimal(10,1)')
  declare unitPrice: number;

  @Column
  declare quantity: number;

  @Column('decimal(10,2)')
  declare discount: number;
}
