import {DefaultCrudRepository} from '@loopback/repository';
import {LegalForm, LegalFormRelations} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LegalFormRepository extends DefaultCrudRepository<
  LegalForm,
  typeof LegalForm.prototype.id,
  LegalFormRelations
> {
  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource,
  ) {
    super(LegalForm, dataSource);
  }
}
