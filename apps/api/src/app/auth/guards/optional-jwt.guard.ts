import { AuthGuard } from '@nestjs/passport';

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  override handleRequest(err: any, user: any, info: any, context: any) {
    return user;
  }
}
