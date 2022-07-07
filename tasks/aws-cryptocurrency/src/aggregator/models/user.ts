import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'integer' })
  public userId: number;

  @Column({ type: 'varchar' })
  public cryptocurrencyName: string;
}
