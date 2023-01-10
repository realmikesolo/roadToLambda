import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from '../app/order/order.router';
import CustomerModel from './customer';
import EmployeeModel from './employee';
import OrderDetailModel from './orderDetail';
import ProductModel from './product';
import ShipperModel from './shippers';

@Table({ tableName: 'Orders', timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare orderID: number;

  @ForeignKey(() => CustomerModel)
  @Column
  declare customerID: string;

  @ForeignKey(() => EmployeeModel)
  @Column
  declare employeeID: number;

  @Column
  declare orderDate: Date;

  @Column
  declare requiredDate: Date;

  @AllowNull
  @Column
  declare shippedDate: Date;

  @ForeignKey(() => ShipperModel)
  @Column
  declare shipVia: number;

  @Column('decimal(10,2)')
  declare freight: number;

  @Column
  declare shipName: string;

  @Column
  declare shipAddress: string;

  @Column
  declare shipCity: string;

  @AllowNull
  @Column
  declare shipRegion: string;

  @Column
  declare shipPostalCode: string;

  @Column
  declare shipCountry: string;

  @BelongsTo(() => CustomerModel)
  customer: CustomerModel;

  @BelongsTo(() => EmployeeModel)
  employee: EmployeeModel;

  @BelongsToMany(() => ProductModel, () => OrderDetailModel)
  products: ProductModel[];

  @BelongsTo(() => ShipperModel)
  shipper: ShipperModel;

  get toAPI(): Omit<Order, 'shipViaCompanyName'> {
    return {
      totalProductsDiscount: this.getDataValue('totalProductsDiscount'),
      totalProductsPrice: this.getDataValue('totalProductsPrice'),
      totalProductsItems: this.getDataValue('totalProductsItems'),
      totalProducts: this.getDataValue('totalProducts'),
      orderID: this.orderID,
      customerID: this.customerID,
      employeeID: this.employeeID,
      orderDate: this.orderDate,
      requiredDate: this.requiredDate,
      shippedDate: this.shippedDate,
      shipVia: this.shipVia,
      freight: this.freight,
      shipName: this.shipName,
      shipAddress: this.shipAddress,
      shipCity: this.shipCity,
      shipRegion: this.shipRegion,
      shipPostalCode: this.shipPostalCode,
      shipCountry: this.shipCountry,
    };
  }
}
