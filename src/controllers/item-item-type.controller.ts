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
  ItemType,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemItemTypeController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/item-type', {
    responses: {
      '200': {
        description: 'ItemType belonging to Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemType)},
          },
        },
      },
    },
  })
  async getItemType(
    @param.path.number('id') id: typeof Item.prototype.id,
  ): Promise<ItemType> {
    return this.itemRepository.itemType(id);
  }
}
