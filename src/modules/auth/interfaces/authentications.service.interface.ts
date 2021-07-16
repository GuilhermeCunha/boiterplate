import { ILoggedUser } from './logged-user.interface';
import { IRegisterUser } from './register-user.interface';

export interface IAuthenticationsService {
  loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ILoggedUser>;
  register(body: IRegisterUser, roles: string[]): Promise<ILoggedUser>;
}
