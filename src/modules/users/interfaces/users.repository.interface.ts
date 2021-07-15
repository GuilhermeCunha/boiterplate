import { IDatabaseRepository } from 'src/shared/interfaces/database-respository.interface';
import { IUser } from 'src/shared/interfaces/user.interface';

export interface IUsersRepository extends IDatabaseRepository<IUser> {
  getOneWithPassword(id: string): Promise<IUser>;
  getOneByEmailWithPassword(email: string): Promise<IUser>;
}
