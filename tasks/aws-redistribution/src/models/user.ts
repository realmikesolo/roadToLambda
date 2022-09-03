import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public shopToken: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
}
