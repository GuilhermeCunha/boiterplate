export interface IUser {
  id?: string;
  email: string;
  passwordHash: string;
  roles: string[];
  createdAt?: number;
}
