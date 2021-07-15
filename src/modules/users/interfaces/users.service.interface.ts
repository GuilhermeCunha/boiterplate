import { IUser } from 'src/shared/interfaces/user.interface';

export interface IUsersService {
  getAll(filters?: Partial<IUser>): Promise<IUser[]>;
  getOne(id: string): Promise<IUser>;
  getOneByEmailWithPassword(email: string): Promise<IUser>;
  getOneWithPassword(id: string): Promise<IUser>;
  create(data: IUser): Promise<IUser>;
  update(id: string, data: IUser): Promise<IUser>;
  delete(id: string): Promise<IUser>;
}
