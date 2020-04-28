import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BillLine, BillLineRelations, Item, Bill} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ItemRepository} from './item.repository';
import {BillRepository} from './bill.repository';

export class BillLineRepository extends DefaultCrudRepository<
  BillLine,
  typeof BillLine.prototype.id,
  BillLineRelations
> {

  public readonly item: BelongsToAccessor<Item, typeof BillLine.prototype.id>;

  public readonly bill: BelongsToAccessor<Bill, typeof BillLine.prototype.id>;

  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>, @repository.getter('BillRepository') protected billRepositoryGetter: Getter<BillRepository>,
  ) {
    super(BillLine, dataSource);
    this.bill = this.createBelongsToAccessorFor('bill', billRepositoryGetter,);
    this.registerInclusionResolver('bill', this.bill.inclusionResolver);
    this.item = this.createBelongsToAccessorFor('item', itemRepositoryGetter,);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
  }
}
