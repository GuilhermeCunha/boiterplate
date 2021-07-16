import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IEncryptionService } from './interfaces/encryption.service.interface';

@Injectable()
export class EncryptionService implements IEncryptionService {
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }
}
