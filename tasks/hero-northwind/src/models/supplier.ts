import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ProductModel from './product';

@Table({ tableName: 'Suppliers', timestamps: false })
export default class SupplierModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare supplierID: number;

  @Column
  declare companyName: string;

  @Column
  declare contactName: string;

  @Column
  declare contactTitle: string;

  @Column
  declare address: string;

  @Column
  declare city: string;

  @AllowNull
  @Column
  declare region: string;

  @Column
  declare postalCode: string;

  @Column
  declare country: string;

  @Column
  declare phone: string;

  @AllowNull
  @Column
  declare fax: string;

  @AllowNull
  @Column('text')
  declare homePage: string;

  @HasMany(() => ProductModel)
  products: ProductModel[];
}
