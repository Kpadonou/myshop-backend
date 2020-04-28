import {Entity, model, property} from '@loopback/repository';

@model()
export class Waiter extends Entity {
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

  @property({
    type: 'string',
  })
  telephone?: string;


  constructor(data?: Partial<Waiter>) {
    super(data);
  }
}

export interface WaiterRelations {
  // describe navigational properties here
}

export type WaiterWithRelations = Waiter & WaiterRelations;
