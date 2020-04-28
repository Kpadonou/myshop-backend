import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Company, CompanyRelations, LegalForm} from '../models';
import {MyshopDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LegalFormRepository} from './legal-form.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly legalForm: BelongsToAccessor<LegalForm, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.myshop') dataSource: MyshopDataSource, @repository.getter('LegalFormRepository') protected legalFormRepositoryGetter: Getter<LegalFormRepository>,
  ) {
    super(Company, dataSource);
    this.legalForm = this.createBelongsToAccessorFor('legalForm', legalFormRepositoryGetter,);
    this.registerInclusionResolver('legalForm', this.legalForm.inclusionResolver);
  }
}
