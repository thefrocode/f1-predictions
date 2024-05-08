import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
const logger = new Logger('GoogleStrategy');

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    logger.log('Initializing GoogleStrategy');
    super();
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
