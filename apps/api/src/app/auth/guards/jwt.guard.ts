import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(
    err: any,
    user: any,
    info: Error,
    context: ExecutionContext
  ) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // If there's an error (e.g., JWT expired, malformed), clear the cookie
    if (err || !user) {
      response.clearCookie('access_token');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
