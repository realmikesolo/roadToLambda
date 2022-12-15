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

  @Column('text')
  declare address: string;

  @AllowNull
  @Column('text')
  declare city: string;

  @AllowNull
  @Column('text')
  declare region: string;

  @AllowNull
  @Column
  declare postalCode: string;

  @AllowNull
  @Column('text')
  declare country: string;

  @AllowNull
  @Column
  declare homePhone: string;

  @AllowNull
  @Column
  declare extension: string;

  @Column('text')
  declare notes: string;

  @Column
  declare reportsTo: string;

  @BelongsToMany(() => TerritoryModel, () => EmployeeTerritoryModel)
  territories: TerritoryModel[];

  @HasMany(() => OrderModel)
  orders: OrderModel[];
}
