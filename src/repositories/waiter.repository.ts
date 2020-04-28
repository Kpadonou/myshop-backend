import {DefaultCrudRepository} from '@loopback/repository';
import {Waiter, WaiterRelations} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class WaiterRepository extends DefaultCrudRepository<
  Waiter,
  typeof Waiter.prototype.id,
  WaiterRelations
> {
  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource,
  ) {
    super(Waiter, dataSource);
  }
}
