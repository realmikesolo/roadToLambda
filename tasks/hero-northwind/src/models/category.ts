import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import ProductModel from './product';

@Table({ tableName: 'Categories', timestamps: false })
export default class CategoryModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare categoryID: number;

  @Column
  declare categoryName: number;

  @Column
  declare description: string;

  @HasMany(() => ProductModel)
  products: ProductModel[];
}
