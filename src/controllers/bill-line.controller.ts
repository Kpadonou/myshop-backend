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
import {BillLine} from '../models';
import {BillLineRepository} from '../repositories';

export class BillLineController {
  constructor(
    @repository(BillLineRepository)
    public billLineRepository : BillLineRepository,
  ) {}

  @post('/bill-lines', {
    responses: {
      '200': {
        description: 'BillLine model instance',
        content: {'application/json': {schema: getModelSchemaRef(BillLine)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillLine, {
            title: 'NewBillLine',
            exclude: ['id'],
          }),
        },
      },
    })
    billLine: Omit<BillLine, 'id'>,
  ): Promise<BillLine> {
    return this.billLineRepository.create(billLine);
  }

  @get('/bill-lines/count', {
    responses: {
      '200': {
        description: 'BillLine model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(BillLine) where?: Where<BillLine>,
  ): Promise<Count> {
    return this.billLineRepository.count(where);
  }

  @get('/bill-lines', {
    responses: {
      '200': {
        description: 'Array of BillLine model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(BillLine, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(BillLine) filter?: Filter<BillLine>,
  ): Promise<BillLine[]> {
    return this.billLineRepository.find(filter);
  }

  @patch('/bill-lines', {
    responses: {
      '200': {
        description: 'BillLine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillLine, {partial: true}),
        },
      },
    })
    billLine: BillLine,
    @param.where(BillLine) where?: Where<BillLine>,
  ): Promise<Count> {
    return this.billLineRepository.updateAll(billLine, where);
  }

  @get('/bill-lines/{id}', {
    responses: {
      '200': {
        description: 'BillLine model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BillLine, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BillLine, {exclude: 'where'}) filter?: FilterExcludingWhere<BillLine>
  ): Promise<BillLine> {
    return this.billLineRepository.findById(id, filter);
  }

  @patch('/bill-lines/{id}', {
    responses: {
      '204': {
        description: 'BillLine PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillLine, {partial: true}),
        },
      },
    })
    billLine: BillLine,
  ): Promise<void> {
    await this.billLineRepository.updateById(id, billLine);
  }

  @put('/bill-lines/{id}', {
    responses: {
      '204': {
        description: 'BillLine PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() billLine: BillLine,
  ): Promise<void> {
    await this.billLineRepository.replaceById(id, billLine);
  }

  @del('/bill-lines/{id}', {
    responses: {
      '204': {
        description: 'BillLine DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.billLineRepository.deleteById(id);
  }
}
