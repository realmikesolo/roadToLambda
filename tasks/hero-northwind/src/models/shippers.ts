import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
}
