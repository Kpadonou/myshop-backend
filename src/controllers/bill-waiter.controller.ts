import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Bill,
  Waiter,
} from '../models';
import {BillRepository} from '../repositories';

export class BillWaiterController {
  constructor(
    @repository(BillRepository)
    public billRepository: BillRepository,
  ) { }

  @get('/bills/{id}/waiter', {
    responses: {
      '200': {
        description: 'Waiter belonging to Bill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Waiter)},
          },
        },
      },
    },
  })
  async getWaiter(
    @param.path.number('id') id: typeof Bill.prototype.id,
  ): Promise<Waiter> {
    return this.billRepository.waiter(id);
  }
}
