import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/shared/interfaces/user.interface';
import { MongooseRepository } from 'src/shared/mongoose.repository';
import { User, UserDocument } from 'src/shared/mongoose/schemas/User.schema';
import { IUsersRepository } from '../interfaces/users.repository.interface';

@Injectable()
export class UsersMongooseRepository
  extends MongooseRepository<UserDocument>
  implements IUsersRepository
{
  constructor(
    @InjectModel(User.name)
    mongooseModel: Model<UserDocument>,
  ) {
    super(mongooseModel);
  }
  async getOneWithPassword(id: string): Promise<IUser> {
    return this.mongooseModel.findById(id).select('+passwordHash').lean();
  }
  async getOneByEmailWithPassword(email: string): Promise<IUser> {
    return this.mongooseModel
      .findOne({
        email,
      })
      .select('+passwordHash')
      .lean();
  }
}
