import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {LegalForm} from '../models';
import {LegalFormRepository} from '../repositories';

export class LegalFormController {
  constructor(
    @repository(LegalFormRepository)
    public legalFormRepository : LegalFormRepository,
  ) {}

  @post('/legal-forms', {
    responses: {
      '200': {
        description: 'LegalForm model instance',
        content: {'application/json': {schema: getModelSchemaRef(LegalForm)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LegalForm, {
            title: 'NewLegalForm',
            exclude: ['id'],
          }),
        },
      },
    })
    legalForm: Omit<LegalForm, 'id'>,
  ): Promise<LegalForm> {
    return this.legalFormRepository.create(legalForm);
  }

  @get('/legal-forms/count', {
    responses: {
      '200': {
        description: 'LegalForm model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(LegalForm) where?: Where<LegalForm>,
  ): Promise<Count> {
    return this.legalFormRepository.count(where);
  }

  @get('/legal-forms', {
    responses: {
      '200': {
        description: 'Array of LegalForm model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LegalForm, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(LegalForm) filter?: Filter<LegalForm>,
  ): Promise<LegalForm[]> {
    return this.legalFormRepository.find(filter);
  }

  @patch('/legal-forms', {
    responses: {
      '200': {
        description: 'LegalForm PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LegalForm, {partial: true}),
        },
      },
    })
    legalForm: LegalForm,
    @param.where(LegalForm) where?: Where<LegalForm>,
  ): Promise<Count> {
    return this.legalFormRepository.updateAll(legalForm, where);
  }

  @get('/legal-forms/{id}', {
    responses: {
      '200': {
        description: 'LegalForm model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LegalForm, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LegalForm, {exclude: 'where'}) filter?: FilterExcludingWhere<LegalForm>
  ): Promise<LegalForm> {
    return this.legalFormRepository.findById(id, filter);
  }

  @patch('/legal-forms/{id}', {
    responses: {
      '204': {
        description: 'LegalForm PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LegalForm, {partial: true}),
        },
      },
    })
    legalForm: LegalForm,
  ): Promise<void> {
    await this.legalFormRepository.updateById(id, legalForm);
  }

  @put('/legal-forms/{id}', {
    responses: {
      '204': {
        description: 'LegalForm PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() legalForm: LegalForm,
  ): Promise<void> {
    await this.legalFormRepository.replaceById(id, legalForm);
  }

  @del('/legal-forms/{id}', {
    responses: {
      '204': {
        description: 'LegalForm DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.legalFormRepository.deleteById(id);
  }
}
