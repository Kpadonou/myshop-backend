import {Entity, model, property} from '@loopback/repository';

@model()
export class ItemCategory extends Entity {
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


  constructor(data?: Partial<ItemCategory>) {
    super(data);
  }
}

export interface ItemCategoryRelations {
  // describe navigational properties here
}

export type ItemCategoryWithRelations = ItemCategory & ItemCategoryRelations;
