import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import EmployeeModel from './employee';
import TerritoryModel from './territory';

@Table({ tableName: 'EmployeeTerritories', timestamps: false })
export default class EmployeeTerritoryModel extends Model {
  @ForeignKey(() => EmployeeModel)
  @Column
  declare employeeID: number;

  @ForeignKey(() => TerritoryModel)
  @Column
  declare territoryID: number;
}
