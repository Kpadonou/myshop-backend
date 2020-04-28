import {belongsTo, Entity, model, property} from '@loopback/repository';
import {PermissionKey} from '../authorization';
import {Role} from './role.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  lastName: string;

  @property({
    type: 'string',
  })
  firstName: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  telephone?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  // To be confirmed
  /*   @property({
      type: 'boolean',
    })
    rowstatus?: boolean; */
  @belongsTo(() => Role)
  roleId: number;
  @property({
    type: 'boolean',
    default: false,
  })
  isAccountValidate?: boolean;

  /* @belongsTo(() => Role)
  roleId: number; */

  @property.array(String)
  permissions: PermissionKey[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
