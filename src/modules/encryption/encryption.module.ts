import { Module } from '@nestjs/common';
import { ENCRYPTION_SERVICE_PROVIDER_KEY } from './constants';
import { EncryptionService } from './encryption.service';

const encryptionService = {
  provide: ENCRYPTION_SERVICE_PROVIDER_KEY,
  useClass: EncryptionService,
};
@Module({
  imports: [],
  providers: [encryptionService],
  exports: [encryptionService],
})
export class EncryptionModule {}
