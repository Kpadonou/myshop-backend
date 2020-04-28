import {DefaultCrudRepository} from '@loopback/repository';
import {ItemCategory, ItemCategoryRelations} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ItemCategoryRepository extends DefaultCrudRepository<
  ItemCategory,
  typeof ItemCategory.prototype.id,
  ItemCategoryRelations
> {
  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource,
  ) {
    super(ItemCategory, dataSource);
  }
}
