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
import {ItemType} from '../models';
import {ItemTypeRepository} from '../repositories';

export class ItemTypeController {
  constructor(
    @repository(ItemTypeRepository)
    public itemTypeRepository : ItemTypeRepository,
  ) {}

  @post('/item-types', {
    responses: {
      '200': {
        description: 'ItemType model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemType, {
            title: 'NewItemType',
            exclude: ['id'],
          }),
        },
      },
    })
    itemType: Omit<ItemType, 'id'>,
  ): Promise<ItemType> {
    return this.itemTypeRepository.create(itemType);
  }

  @get('/item-types/count', {
    responses: {
      '200': {
        description: 'ItemType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ItemType) where?: Where<ItemType>,
  ): Promise<Count> {
    return this.itemTypeRepository.count(where);
  }

  @get('/item-types', {
    responses: {
      '200': {
        description: 'Array of ItemType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ItemType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ItemType) filter?: Filter<ItemType>,
  ): Promise<ItemType[]> {
    return this.itemTypeRepository.find(filter);
  }

  @patch('/item-types', {
    responses: {
      '200': {
        description: 'ItemType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemType, {partial: true}),
        },
      },
    })
    itemType: ItemType,
    @param.where(ItemType) where?: Where<ItemType>,
  ): Promise<Count> {
    return this.itemTypeRepository.updateAll(itemType, where);
  }

  @get('/item-types/{id}', {
    responses: {
      '200': {
        description: 'ItemType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ItemType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemType, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemType>
  ): Promise<ItemType> {
    return this.itemTypeRepository.findById(id, filter);
  }

  @patch('/item-types/{id}', {
    responses: {
      '204': {
        description: 'ItemType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemType, {partial: true}),
        },
      },
    })
    itemType: ItemType,
  ): Promise<void> {
    await this.itemTypeRepository.updateById(id, itemType);
  }

  @put('/item-types/{id}', {
    responses: {
      '204': {
        description: 'ItemType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemType: ItemType,
  ): Promise<void> {
    await this.itemTypeRepository.replaceById(id, itemType);
  }

  @del('/item-types/{id}', {
    responses: {
      '204': {
        description: 'ItemType DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemTypeRepository.deleteById(id);
  }
}
