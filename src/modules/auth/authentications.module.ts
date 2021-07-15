import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { EncryptionService } from '../encryption/encryption.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { AUTHENTICATIONS_SERVICE_PROVIDER_KEY } from './contants';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AuthenticationsController],
  providers: [
    {
      provide: AUTHENTICATIONS_SERVICE_PROVIDER_KEY,
      useClass: AuthenticationsService,
    },
    EncryptionService,
  ],
})
export class AuthenticationsModule {}
