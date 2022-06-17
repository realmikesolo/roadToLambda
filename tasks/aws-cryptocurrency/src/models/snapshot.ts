import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SnapshotModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: true })
  public cryptocurrencyName: string;

  @Column({ type: 'float', nullable: true })
  public coinbaseValue: number | undefined;

  @Column({ type: 'float', nullable: true })
  public coinmarketcapValue: number | undefined;

  @Column({ type: 'float', nullable: true })
  public coinstatsValue: number | undefined;

  @Column({ type: 'float', nullable: true })
  public coinpaprikaValue: number | undefined;

  @Column({ type: 'float', nullable: true })
  public kucoinValue: number | undefined;

  @CreateDateColumn()
  public createdAt: Date;
}
