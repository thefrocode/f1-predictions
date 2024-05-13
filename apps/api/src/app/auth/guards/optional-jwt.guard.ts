import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from '../strategies/jwt.strategy';

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any, context: any) {
    return user;
  }
}
