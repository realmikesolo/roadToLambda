import { Column, IsUUID, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({ tableName: 'Links' })
export class LinkModel extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  declare id: string;

  @Column
  declare link: string;

  @Unique
  @Column
  declare shortLink: string;
}
