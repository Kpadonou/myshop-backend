import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Item, ItemRelations, ItemCategory, ItemType} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ItemCategoryRepository} from './item-category.repository';
import {ItemTypeRepository} from './item-type.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {

  public readonly itemCategory: BelongsToAccessor<ItemCategory, typeof Item.prototype.id>;

  public readonly itemType: BelongsToAccessor<ItemType, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource, @repository.getter('ItemCategoryRepository') protected itemCategoryRepositoryGetter: Getter<ItemCategoryRepository>, @repository.getter('ItemTypeRepository') protected itemTypeRepositoryGetter: Getter<ItemTypeRepository>,
  ) {
    super(Item, dataSource);
    this.itemType = this.createBelongsToAccessorFor('itemType', itemTypeRepositoryGetter,);
    this.registerInclusionResolver('itemType', this.itemType.inclusionResolver);
    this.itemCategory = this.createBelongsToAccessorFor('itemCategory', itemCategoryRepositoryGetter,);
    this.registerInclusionResolver('itemCategory', this.itemCategory.inclusionResolver);
  }
}
