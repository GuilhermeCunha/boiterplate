import { Inject, Injectable } from '@nestjs/common';
import { IUser } from 'src/shared/interfaces/user.interface';
import { USERS_REPOSITORY_PROVIDER_KEY } from './contants';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { IUsersService } from './interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(USERS_REPOSITORY_PROVIDER_KEY)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async getAll(filters?: Partial<IUser>): Promise<IUser[]> {
    return await this.usersRepository.getAll(filters);
  }
  async getOne(id?: string): Promise<IUser> {
    return await this.usersRepository.getOne(id);
  }
  async getOneWithPassword(id?: string): Promise<IUser> {
    return await this.usersRepository.getOneWithPassword(id);
  }

  async getOneByEmailWithPassword(id?: string): Promise<IUser> {
    return await this.usersRepository.getOneByEmailWithPassword(id);
  }
  async create(data: IUser): Promise<IUser> {
    return await this.usersRepository.create(data);
  }
  async update(id: string, data: IUser): Promise<IUser> {
    return await this.usersRepository.update(id, data);
  }
  async delete(id: string): Promise<IUser> {
    return await this.usersRepository.delete(id);
  }
}
