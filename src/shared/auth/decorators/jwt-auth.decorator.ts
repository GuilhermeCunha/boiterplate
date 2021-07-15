import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { FirebaseRolesGuard } from '../roles/firebase-roles.guard';

export function JwtAuth(allowedRoles?: string[]): any {
  return applyDecorators(
    UseGuards(JwtAuthGuard, FirebaseRolesGuard),
    Roles(allowedRoles),
    ApiBearerAuth(),
  );
}
