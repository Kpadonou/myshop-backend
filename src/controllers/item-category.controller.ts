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
import {ItemCategory} from '../models';
import {ItemCategoryRepository} from '../repositories';

export class ItemCategoryController {
  constructor(
    @repository(ItemCategoryRepository)
    public itemCategoryRepository : ItemCategoryRepository,
  ) {}

  @post('/item-categories', {
    responses: {
      '200': {
        description: 'ItemCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemCategory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCategory, {
            title: 'NewItemCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    itemCategory: Omit<ItemCategory, 'id'>,
  ): Promise<ItemCategory> {
    return this.itemCategoryRepository.create(itemCategory);
  }

  @get('/item-categories/count', {
    responses: {
      '200': {
        description: 'ItemCategory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ItemCategory) where?: Where<ItemCategory>,
  ): Promise<Count> {
    return this.itemCategoryRepository.count(where);
  }

  @get('/item-categories', {
    responses: {
      '200': {
        description: 'Array of ItemCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ItemCategory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ItemCategory) filter?: Filter<ItemCategory>,
  ): Promise<ItemCategory[]> {
    return this.itemCategoryRepository.find(filter);
  }

  @patch('/item-categories', {
    responses: {
      '200': {
        description: 'ItemCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCategory, {partial: true}),
        },
      },
    })
    itemCategory: ItemCategory,
    @param.where(ItemCategory) where?: Where<ItemCategory>,
  ): Promise<Count> {
    return this.itemCategoryRepository.updateAll(itemCategory, where);
  }

  @get('/item-categories/{id}', {
    responses: {
      '200': {
        description: 'ItemCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ItemCategory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<ItemCategory>
  ): Promise<ItemCategory> {
    return this.itemCategoryRepository.findById(id, filter);
  }

  @patch('/item-categories/{id}', {
    responses: {
      '204': {
        description: 'ItemCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCategory, {partial: true}),
        },
      },
    })
    itemCategory: ItemCategory,
  ): Promise<void> {
    await this.itemCategoryRepository.updateById(id, itemCategory);
  }

  @put('/item-categories/{id}', {
    responses: {
      '204': {
        description: 'ItemCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemCategory: ItemCategory,
  ): Promise<void> {
    await this.itemCategoryRepository.replaceById(id, itemCategory);
  }

  @del('/item-categories/{id}', {
    responses: {
      '204': {
        description: 'ItemCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemCategoryRepository.deleteById(id);
  }
}
