import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {toJSON} from '@loopback/testlab';
import * as _ from 'lodash';
import {promisify} from 'util';
import {PasswordHasherBindings, TokenServiceBindings} from '../../keys';
import {UserRepository} from '../../repositories';
import {PasswordHasher} from '../../services/hash.password.bcryptjs';
import {TokenServiceConstants} from '../keys';
import {Credential, MyUserProfile} from '../types';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}

  async verifyToken(token: string): Promise<MyUserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    const decryptedToken = await verifyAsync(
      token,
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    const userProfile = _.pick(decryptedToken, [
      'id',
      `securityId`,
      'email',
      'name',
      `permissions`,
    ]) as MyUserProfile;
    return userProfile;
  }

  async generateToken(userProfile: MyUserProfile): Promise<string> {
    const token = await signAsync(
      userProfile,
      TokenServiceConstants.TOKEN_SECRET_VALUE,
      {
        //expiresIn: TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
        expiresIn: Number(this.jwtExpiresIn),
      },
    );

    return token;
  }

  async getToken(credential: Credential): Promise<string> {
    const foundUser = await this.userRepository.findOne({
      where: {email: credential.email},
    });
    if (!foundUser) {
      throw new HttpErrors['NotFound'](
        `User with email ${credential.email} not found.`,
      );
    }

    /* if (foundUser && foundUser.rowstatus == true) {
            throw new HttpErrors['NotFound'](
                `User with email ${credential.email} account deleted.`,
            );
        } */

    if (foundUser && foundUser.isAccountValidate === false) {
      throw new HttpErrors['NotFound'](
        `User with email ${credential.email} account locked.`,
      );
    }

    //if (password != foundUser.password) {
    const passwordMatched = await this.passwordHasher.comparePassword(
      credential.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct.');
    }
    const currentUser: MyUserProfile = _.pick(toJSON(foundUser), [
      'id',
      'email',
      'firstName',
      'permissions',
    ]) as MyUserProfile;

    const token = await this.generateToken(currentUser);
    return token;
  }
}
