import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { ROLES_KEY } from '../constants';

export const Roles = (roles: string[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
