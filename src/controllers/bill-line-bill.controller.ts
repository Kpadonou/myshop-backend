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
  Bill,
} from '../models';
import {BillLineRepository} from '../repositories';

export class BillLineBillController {
  constructor(
    @repository(BillLineRepository)
    public billLineRepository: BillLineRepository,
  ) { }

  @get('/bill-lines/{id}/bill', {
    responses: {
      '200': {
        description: 'Bill belonging to BillLine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bill)},
          },
        },
      },
    },
  })
  async getBill(
    @param.path.number('id') id: typeof BillLine.prototype.id,
  ): Promise<Bill> {
    return this.billLineRepository.bill(id);
  }
}
