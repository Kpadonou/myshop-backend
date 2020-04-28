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
  Client,
} from '../models';
import {BillRepository} from '../repositories';

export class BillClientController {
  constructor(
    @repository(BillRepository)
    public billRepository: BillRepository,
  ) { }

  @get('/bills/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Bill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof Bill.prototype.id,
  ): Promise<Client> {
    return this.billRepository.client(id);
  }
}
