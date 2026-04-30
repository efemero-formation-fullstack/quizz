import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Session } from '../../interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly _jwtService: JwtService) {}

  use(req: Request & { session: Session }, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return next();
    }

    const [type, token] = bearerToken.split(' ');
    if (type.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Invalid type');
    }

    try {
      const session = this._jwtService.verify<Session>(token);
      req.session = session;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    next();
  }
}
