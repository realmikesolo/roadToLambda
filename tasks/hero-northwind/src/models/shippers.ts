import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import OrderModel from './order';

@Table({ tableName: 'Shippers', timestamps: false })
export default class ShipperModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare shipperID: number;

  @Column
  declare companyName: string;

  @Column
  declare phone: string;

  @HasMany(() => OrderModel)
  orders: OrderModel[];
}
