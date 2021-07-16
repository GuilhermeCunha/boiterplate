import { Module } from '@nestjs/common';
import { USERS_SERVICE_PROVIDER_KEY } from './contants';
import { UsersService } from './users.service';
import { UsersMongooseModule } from './infra/users.mongoose.module';

const usersService = {
  provide: USERS_SERVICE_PROVIDER_KEY,
  useClass: UsersService,
};
@Module({
  imports: [UsersMongooseModule],
  providers: [usersService],
  exports: [usersService],
})
export class UsersModule {}
