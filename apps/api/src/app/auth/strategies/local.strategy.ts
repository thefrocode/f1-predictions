import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
    console.log('LocalStrategy constructor');
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(email);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
    }

    return user;
  }
}
