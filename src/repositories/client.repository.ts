import {DefaultCrudRepository} from '@loopback/repository';
import {Client, ClientRelations} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {
  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource,
  ) {
    super(Client, dataSource);
  }
}
