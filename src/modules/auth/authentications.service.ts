import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ENCRYPTION_SERVICE_PROVIDER_KEY } from '../encryption/constants';
import { IEncryptionService } from '../encryption/interfaces/encryption.service.interface';
import { USERS_SERVICE_PROVIDER_KEY } from '../users/contants';
import { IUsersService } from '../users/interfaces/users.service.interface';
import { IAuthenticationsService } from './interfaces/authentications.service.interface';
import { ILoggedUser } from './interfaces/logged-user.interface';
import { IRegisterUser } from './interfaces/register-user.interface';

@Injectable()
export class AuthenticationsService implements IAuthenticationsService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ENCRYPTION_SERVICE_PROVIDER_KEY)
    private readonly encryptionService: IEncryptionService,
    @Inject(USERS_SERVICE_PROVIDER_KEY)
    private readonly userService: IUsersService,
  ) {}
  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ILoggedUser> {
    const { passwordHash, ...user } =
      await this.userService.getOneByEmailWithPassword(email);

    const verifyPassword = await this.encryptionService.verifyPassword(
      password,
      passwordHash,
    );
    if (!verifyPassword) {
      throw new HttpException('Bad credentials', HttpStatus.BAD_REQUEST);
    }
    return {
      user: user,
      jwtToken: this.jwtService.sign(user),
    };
  }
  async register(
    { password, ...user }: IRegisterUser,
    roles: string[],
  ): Promise<ILoggedUser> {
    const passwordHash = await this.encryptionService.encryptPassword(password);

    const createdUser = await this.userService.create({
      ...user,
      passwordHash,
      roles: roles,
    });

    delete createdUser.passwordHash;
    return {
      user: createdUser,
      jwtToken: this.jwtService.sign(createdUser),
    };
  }
}
