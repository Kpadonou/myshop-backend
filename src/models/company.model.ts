import {belongsTo, Entity, model, property} from '@loopback/repository';
import {LegalForm} from './legal-form.model';

@model({
  settings: {
    fk_company_legalFormId: {
      name: 'fk_company_legalFormId',
      entity: 'LegalForm',
      entityKey: 'id',
      foreignKey: 'legalFormId',
    },
  },
})
export class Company extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  ifu?: string;

  @property({
    type: 'string',
    required: true,
  })
  companyName: string; // Raison sociale

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  telephone?: string;

  @belongsTo(() => LegalForm)
  legalFormId: number;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
