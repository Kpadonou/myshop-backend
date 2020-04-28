import {DefaultCrudRepository} from '@loopback/repository';
import {ItemType, ItemTypeRelations} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemTypeRepository extends DefaultCrudRepository<
  ItemType,
  typeof ItemType.prototype.id,
  ItemTypeRelations
> {
  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource,
  ) {
    super(ItemType, dataSource);
  }
}
