import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import EmployeeTerritoryModel from './employeeTerritory';
import OrderModel from './order';
import TerritoryModel from './territory';

@Table({ tableName: 'Employees', timestamps: false })
export default class EmployeeModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare employeeID: number;

  @Column
  declare lastName: string;

  @Column
  declare firstName: string;

  @Column
  declare title: string;

  @Column
  declare titleOfCourtesy: string;

  @Column
  declare birthDate: Date;

  @Column
  declare hireDate: Date;

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
  declare homePhone: string;

  @Column
  declare extension: string;

  @Column('text')
  declare notes: string;

  @AllowNull
  @Column
  declare reportsTo: number;

  @BelongsToMany(() => TerritoryModel, () => EmployeeTerritoryModel)
  territories: TerritoryModel[];

  @HasMany(() => OrderModel)
  orders: OrderModel[];
}
