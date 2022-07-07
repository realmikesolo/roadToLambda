import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'snapshots' })
export class SnapshotModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: true })
  public cryptocurrencyName: string;

  @Column({ type: 'float', nullable: true })
  public coinbaseValue?: number;

  @Column({ type: 'float', nullable: true })
  public coinmarketcapValue?: number;

  @Column({ type: 'float', nullable: true })
  public coinstatsValue?: number;

  @Column({ type: 'float', nullable: true })
  public coinpaprikaValue?: number;

  @Column({ type: 'float', nullable: true })
  public kucoinValue?: number;

  @CreateDateColumn()
  public createdAt: Date;
}
