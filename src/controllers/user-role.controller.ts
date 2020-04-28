import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Role, User} from '../models';
import {UserRepository} from '../repositories';
import {OPERATION_SECURITY_SPEC} from './../utils/security-spec';

export class UserRoleController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get('/users/{id}/role', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Role belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Role)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async getRole(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Role> {
    return this.userRepository.role(id);
  }
}
