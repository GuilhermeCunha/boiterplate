import { RegisterDTO } from '../dto/register.dto';
import { ILoggedUser } from './logged-user.interface';

export interface IAuthenticationsService {
  login(email: string, password: string): Promise<ILoggedUser>;
  register(body: RegisterDTO, roles: string[]): Promise<ILoggedUser>;
}
