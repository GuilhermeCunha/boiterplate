import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationsController } from './rest/authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { AUTHENTICATIONS_SERVICE_PROVIDER_KEY } from './constants';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [AuthModule, UsersModule, EncryptionModule],
  controllers: [AuthenticationsController],
  providers: [
    {
      provide: AUTHENTICATIONS_SERVICE_PROVIDER_KEY,
      useClass: AuthenticationsService,
    },
  ],
})
export class AuthenticationsModule {}
