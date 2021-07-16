import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shared/mongoose/schemas/User.schema';
import { USERS_REPOSITORY_PROVIDER_KEY } from '../contants';
import { UsersMongooseRepository } from './users.mongoose.repository';

const mongooseFeatures = [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];
const usersMongooseRepository = {
  provide: USERS_REPOSITORY_PROVIDER_KEY,
  useClass: UsersMongooseRepository,
};
@Module({
  imports: [...mongooseFeatures],
  exports: [...mongooseFeatures, usersMongooseRepository],
  providers: [usersMongooseRepository],
})
export class UsersMongooseModule {}
