import { config } from 'dotenv';
config();

export const APP_PORT = process.env.PORT;
export const MONGOOSE_CONNECTION_STRING =
  process.env.MONGOOSE_CONNECTION_STRING;

export const CORS_WHITE_LIST = [''];

export const ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin',
};
