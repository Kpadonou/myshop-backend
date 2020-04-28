import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Item,
  ItemCategory,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemItemCategoryController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/item-category', {
    responses: {
      '200': {
        description: 'ItemCategory belonging to Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemCategory)},
          },
        },
      },
    },
  })
  async getItemCategory(
    @param.path.number('id') id: typeof Item.prototype.id,
  ): Promise<ItemCategory> {
    return this.itemRepository.itemCategory(id);
  }
}
