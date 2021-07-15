import { IUser } from './user.interface';

export interface IJwtData extends Omit<IUser, 'passwordHash'> {
  jwtDetails: {
    iat: number;
    exp: number;
  };
}
