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

  get totalProductsDiscount(): number | undefined {
    return this.getDataValue('totalProductsDiscount');
  }

  get totalProductsPrice(): number | undefined {
    return this.getDataValue('totalProductsPrice');
  }

  get totalProductsItems(): number | undefined {
    return this.getDataValue('totalProductsItems');
  }

  get totalProducts(): number | undefined {
    return this.getDataValue('totalProducts');
  }
}
