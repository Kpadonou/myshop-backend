import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Bill} from './bill.model';
import {Item} from './item.model';

@model({
  settings: {
    fk_billLine_itemId: {
      name: 'fk_billLine_itemId',
      entity: 'Item',
      entityKey: 'id',
      foreignKey: 'itemId',
    },
    fk_billLine_billId: {
      name: 'fk_billLine_billId',
      entity: 'Bill',
      entityKey: 'id',
      foreignKey: 'billId',
    },
  },
})
export class BillLine extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  vatRate: number;

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

  @belongsTo(() => Item)
  itemId: number;

  @belongsTo(() => Bill)
  billId: number;

  constructor(data?: Partial<BillLine>) {
    super(data);
  }
}

export interface BillLineRelations {
  // describe navigational properties here
}

export type BillLineWithRelations = BillLine & BillLineRelations;
