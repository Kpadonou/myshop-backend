import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Bill, BillRelations, Client, Waiter, BillLine} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ClientRepository} from './client.repository';
import {WaiterRepository} from './waiter.repository';
import {BillLineRepository} from './bill-line.repository';

export class BillRepository extends DefaultCrudRepository<
  Bill,
  typeof Bill.prototype.id,
  BillRelations
> {

  public readonly client: BelongsToAccessor<Client, typeof Bill.prototype.id>;

  public readonly waiter: BelongsToAccessor<Waiter, typeof Bill.prototype.id>;

  public readonly billLines: HasManyRepositoryFactory<BillLine, typeof Bill.prototype.id>;

  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('WaiterRepository') protected waiterRepositoryGetter: Getter<WaiterRepository>, @repository.getter('BillLineRepository') protected billLineRepositoryGetter: Getter<BillLineRepository>,
  ) {
    super(Bill, dataSource);
    this.billLines = this.createHasManyRepositoryFactoryFor('billLines', billLineRepositoryGetter,);
    this.registerInclusionResolver('billLines', this.billLines.inclusionResolver);
    this.waiter = this.createBelongsToAccessorFor('waiter', waiterRepositoryGetter,);
    this.registerInclusionResolver('waiter', this.waiter.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
