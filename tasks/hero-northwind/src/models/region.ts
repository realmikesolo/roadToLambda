import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import TerritoryModel from './territory';

@Table({ tableName: 'Regions', timestamps: false })
export default class RegionModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare regionID: number;

  @Column
  declare regionDescription: string;

  @HasMany(() => TerritoryModel)
  territories: TerritoryModel[];
}
