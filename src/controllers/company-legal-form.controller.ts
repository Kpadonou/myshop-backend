import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Company,
  LegalForm,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyLegalFormController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/legal-form', {
    responses: {
      '200': {
        description: 'LegalForm belonging to Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LegalForm)},
          },
        },
      },
    },
  })
  async getLegalForm(
    @param.path.number('id') id: typeof Company.prototype.id,
  ): Promise<LegalForm> {
    return this.companyRepository.legalForm(id);
  }
}
