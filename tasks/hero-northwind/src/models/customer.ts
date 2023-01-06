import { AllowNull, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Customer } from '../app/customer/customer.router';
import OrderModel from './order';

@Table({ tableName: 'Customers', timestamps: false })
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare customerID: string;

  @Column
  declare companyName: string;

  @Column
  declare contactName: string;

  @Column
  declare contactTitle: string;

  @AllowNull
  @Column
  declare address: string;

  @AllowNull
  @Column
  declare city: string;

  @AllowNull
  @Column
  declare region: string;

  @AllowNull
  @Column
  declare postalCode: string;

  @AllowNull
  @Column
  declare country: string;

  @AllowNull
  @Column
  declare phone: string;

  @AllowNull
  @Column
  declare fax: string;

  @HasMany(() => OrderModel)
  orders: OrderModel[];

  get toAPI(): Customer {
    return {
      customerID: this.customerID,
      companyName: this.companyName,
      contactName: this.contactName,
      contactTitle: this.contactTitle,
      address: this.address,
      city: this.city,
      region: this.region,
      postalCode: this.postalCode,
      country: this.country,
      phone: this.phone,
      fax: this.fax,
    };
  }
}
