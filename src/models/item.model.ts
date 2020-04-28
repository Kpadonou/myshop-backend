import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ItemCategory} from './item-category.model';
import {ItemType} from './item-type.model';

@model({
  settings: {
    fk_item_itemTypeId: {
      name: 'fk_item_itemTypeId',
      entity: 'ItemType',
      entityKey: 'id',
      foreignKey: 'itemTypeId',
    },
    fk_item_itemCategoryId: {
      name: 'fk_item_itemCategoryId',
      entity: 'ItemCategory',
      entityKey: 'id',
      foreignKey: 'itemCategoryId',
    },
  },
})
export class Item extends Entity {
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
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  sellingPrice: number;

  /* @property({
    type: 'number',
  })
  prixMarchand?: number; */

  // Prix de gros
  @property({
    type: 'number',
  })
  wholesalePrice?: number;

  // Prix d'achat
  @property({
    type: 'number',
  })
  purchasePrice?: number;

  @belongsTo(() => ItemCategory)
  itemCategoryId: number;

  @belongsTo(() => ItemType)
  itemTypeId: number;
  @property({
    type: 'number',
  })
  minimumStock?: number;

  @property({
    type: 'number',
  })
  initialQuantity?: number;

  /* @property({
    type: 'string',
  })
  emplacement?: string; */

  @property({
    type: 'string',
  })
  unitOfMeasure?: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
