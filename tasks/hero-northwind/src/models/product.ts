import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import CategoryModel from './category';
import OrderModel from './order';
import OrderDetailModel from './orderDetail';
import SupplierModel from './supplier';

@Table({ tableName: 'Products', timestamps: false })
export default class ProductModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare productID: number;

  @Column
  declare productName: string;

  @ForeignKey(() => SupplierModel)
  @Column
  declare supplierID: number;

  @ForeignKey(() => CategoryModel)
  @Column
  declare categoryID: number;

  @Column
  declare quantityPerUnit: string;

  @Column('decimal(10,2)')
  declare unitPrice: number;

  @Column
  declare unitsInStock: number;

  @Column
  declare unitsOnOrder: number;

  @Column
  declare reorderLevel: number;

  @Column
  declare discontinued: number;

  @BelongsTo(() => CategoryModel)
  category: CategoryModel;

  @BelongsTo(() => SupplierModel)
  supplier: SupplierModel;

  @BelongsToMany(() => OrderModel, () => OrderDetailModel)
  orders: OrderModel[];
}
