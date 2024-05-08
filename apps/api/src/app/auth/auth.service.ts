import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { googleConstants, jwtConstants } from './constants';
const axios = require('axios');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: 3600,
      }),
      user_id: user.id,
    };
  }
  generateGoogleRedirectUrl() {
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleConstants.google_client_id}&redirect_uri=${googleConstants.google_callback_url}&response_type=code&scope=profile email`;
  }
  async getProfile(code: string) {
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: googleConstants.google_client_id,
      client_secret: googleConstants.google_client_secret,
      code,
      redirect_uri: googleConstants.google_callback_url,
      grant_type: 'authorization_code',
    });
    const { access_token } = data;

    const { data: profile } = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    return profile;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
