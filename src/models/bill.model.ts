import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {BillLine} from './bill-line.model';
import {Client} from './client.model';
import {Waiter} from './waiter.model';

@model({
  settings: {
    fk_bill_clientId: {
      name: 'fk_bill_clientId',
      entity: 'Client',
      entityKey: 'id',
      foreignKey: 'clientId',
    },
    fk_bill_waiterId: {
      name: 'fk_bill_waiterId',
      entity: 'Waiter',
      entityKey: 'id',
      foreignKey: 'waiterId',
    },
  },
})
export class Bill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  reference: string;

  // Montant HT
  @property({
    type: 'number',
    required: true,
  })
  excludingTaxesAmount: number;

  // Montant TTC
  @property({
    type: 'number',
    required: true,
  })
  includingTaxesAmount?: number;

  // Montant TVA
  @property({
    type: 'number',
  })
  vatAmount?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isIssued: boolean;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @belongsTo(() => Client)
  clientId: number;

  @belongsTo(() => Waiter)
  waiterId: number;

  @hasMany(() => BillLine)
  billLines: BillLine[];

  constructor(data?: Partial<Bill>) {
    super(data);
  }
}

export interface BillRelations {
  // describe navigational properties here
}

export type BillWithRelations = Bill & BillRelations;
