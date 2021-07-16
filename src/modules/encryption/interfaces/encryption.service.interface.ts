export interface IEncryptionService {
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  encryptPassword(password: string): Promise<string>;
}
