import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PlayersService } from '../../players/players.service';
import { jwtConstants } from '../constants';
import * as dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private playerService: PlayersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    const player = await this.playerService.findPlayerByUserId(payload.sub);
    return {
      user_id: payload.sub,
      player_id: player!.id,
    };
  }
}
