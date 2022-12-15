import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import EmployeeModel from './employee';
import EmployeeTerritoryModel from './employeeTerritory';
import RegionModel from './region';

@Table({ tableName: 'Territories', timestamps: false })
export default class TerritoryModel extends Model {
  @PrimaryKey
  @Column
  declare territoryID: number;

  @Column
  declare territoryDescription: string;

  @ForeignKey(() => RegionModel)
  @Column
  declare regionID: number;

  @BelongsToMany(() => EmployeeModel, () => EmployeeTerritoryModel)
  employees: EmployeeModel[];

  @BelongsTo(() => RegionModel)
  region: RegionModel;
}
