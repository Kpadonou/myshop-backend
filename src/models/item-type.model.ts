import {Entity, model, property} from '@loopback/repository';

@model()
export class ItemType extends Entity {
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
  name: string;


  constructor(data?: Partial<ItemType>) {
    super(data);
  }
}

export interface ItemTypeRelations {
  // describe navigational properties here
}

export type ItemTypeWithRelations = ItemType & ItemTypeRelations;
