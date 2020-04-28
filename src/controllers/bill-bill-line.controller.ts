import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Bill,
  BillLine,
} from '../models';
import {BillRepository} from '../repositories';

export class BillBillLineController {
  constructor(
    @repository(BillRepository) protected billRepository: BillRepository,
  ) { }

  @get('/bills/{id}/bill-lines', {
    responses: {
      '200': {
        description: 'Array of Bill has many BillLine',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BillLine)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BillLine>,
  ): Promise<BillLine[]> {
    return this.billRepository.billLines(id).find(filter);
  }

  @post('/bills/{id}/bill-lines', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: {'application/json': {schema: getModelSchemaRef(BillLine)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bill.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillLine, {
            title: 'NewBillLineInBill',
            exclude: ['id'],
            optional: ['billId']
          }),
        },
      },
    }) billLine: Omit<BillLine, 'id'>,
  ): Promise<BillLine> {
    return this.billRepository.billLines(id).create(billLine);
  }

  @patch('/bills/{id}/bill-lines', {
    responses: {
      '200': {
        description: 'Bill.BillLine PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillLine, {partial: true}),
        },
      },
    })
    billLine: Partial<BillLine>,
    @param.query.object('where', getWhereSchemaFor(BillLine)) where?: Where<BillLine>,
  ): Promise<Count> {
    return this.billRepository.billLines(id).patch(billLine, where);
  }

  @del('/bills/{id}/bill-lines', {
    responses: {
      '200': {
        description: 'Bill.BillLine DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BillLine)) where?: Where<BillLine>,
  ): Promise<Count> {
    return this.billRepository.billLines(id).delete(where);
  }
}
