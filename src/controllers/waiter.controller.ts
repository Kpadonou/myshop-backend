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
import {Waiter} from '../models';
import {WaiterRepository} from '../repositories';

export class WaiterController {
  constructor(
    @repository(WaiterRepository)
    public waiterRepository : WaiterRepository,
  ) {}

  @post('/waiters', {
    responses: {
      '200': {
        description: 'Waiter model instance',
        content: {'application/json': {schema: getModelSchemaRef(Waiter)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Waiter, {
            title: 'NewWaiter',
            exclude: ['id'],
          }),
        },
      },
    })
    waiter: Omit<Waiter, 'id'>,
  ): Promise<Waiter> {
    return this.waiterRepository.create(waiter);
  }

  @get('/waiters/count', {
    responses: {
      '200': {
        description: 'Waiter model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Waiter) where?: Where<Waiter>,
  ): Promise<Count> {
    return this.waiterRepository.count(where);
  }

  @get('/waiters', {
    responses: {
      '200': {
        description: 'Array of Waiter model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Waiter, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Waiter) filter?: Filter<Waiter>,
  ): Promise<Waiter[]> {
    return this.waiterRepository.find(filter);
  }

  @patch('/waiters', {
    responses: {
      '200': {
        description: 'Waiter PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Waiter, {partial: true}),
        },
      },
    })
    waiter: Waiter,
    @param.where(Waiter) where?: Where<Waiter>,
  ): Promise<Count> {
    return this.waiterRepository.updateAll(waiter, where);
  }

  @get('/waiters/{id}', {
    responses: {
      '200': {
        description: 'Waiter model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Waiter, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Waiter, {exclude: 'where'}) filter?: FilterExcludingWhere<Waiter>
  ): Promise<Waiter> {
    return this.waiterRepository.findById(id, filter);
  }

  @patch('/waiters/{id}', {
    responses: {
      '204': {
        description: 'Waiter PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Waiter, {partial: true}),
        },
      },
    })
    waiter: Waiter,
  ): Promise<void> {
    await this.waiterRepository.updateById(id, waiter);
  }

  @put('/waiters/{id}', {
    responses: {
      '204': {
        description: 'Waiter PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() waiter: Waiter,
  ): Promise<void> {
    await this.waiterRepository.replaceById(id, waiter);
  }

  @del('/waiters/{id}', {
    responses: {
      '204': {
        description: 'Waiter DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.waiterRepository.deleteById(id);
  }
}
