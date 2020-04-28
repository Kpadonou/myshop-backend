import {Entity, model, property} from '@loopback/repository';

@model()
export class LegalForm extends Entity {
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


  constructor(data?: Partial<LegalForm>) {
    super(data);
  }
}

export interface LegalFormRelations {
  // describe navigational properties here
}

export type LegalFormWithRelations = LegalForm & LegalFormRelations;
