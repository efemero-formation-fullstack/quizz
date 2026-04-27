import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../enums/user-role.enum';
import { SessionInterface } from '../../interfaces/session.interface';
import { Request } from 'express';

@Injectable()
export class RequireRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<UserRole[]>('require-role', context.getHandler());
    const req = context.switchToHttp().getRequest<Request & { session: SessionInterface }>();
    //user pas connecté
    if (!req.session) {
      throw new UnauthorizedException('Not authenticated');
    }
    // user connecté, aucun role requis
    if (!roles || roles.length === 0) {
      return true;
    }
    // user connecté dans la liste des roles
    if (!roles.includes(req.session.role as UserRole)) {
      throw new UnauthorizedException('Forbidden');
    }

    return true;
  }
}

