import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './constants';

export type LoggedUser = {
  roles: string[];
};
export function hasPermission(roles: string[], user: LoggedUser): boolean {
  return (user.roles || []).some((role) => roles.includes(role));
}

@Injectable()
export class FirebaseRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true;
    if (roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();

    const user: LoggedUser | undefined = request.user;

    if (!user) return false;

    return hasPermission(roles, user);
  }
}
