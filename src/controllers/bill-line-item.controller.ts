import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BillLine,
  Item,
} from '../models';
import {BillLineRepository} from '../repositories';

export class BillLineItemController {
  constructor(
    @repository(BillLineRepository)
    public billLineRepository: BillLineRepository,
  ) { }

  @get('/bill-lines/{id}/item', {
    responses: {
      '200': {
        description: 'Item belonging to BillLine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async getItem(
    @param.path.number('id') id: typeof BillLine.prototype.id,
  ): Promise<Item> {
    return this.billLineRepository.item(id);
  }
}
