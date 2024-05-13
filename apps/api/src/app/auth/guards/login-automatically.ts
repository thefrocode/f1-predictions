import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class LoginAutomatically
  extends AuthGuard('jwt')
  implements CanActivate
{
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (canActivate) {
      return true;
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // If canActivate is false, the token is invalid
    // Clear the cookie and throw an UnauthorizedException
    response.clearCookie('access_token');
    throw new UnauthorizedException('Invalid token');
  }
}
