import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import {
  CreateLocalUserDto,
  CreateUserDto,
} from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/local.guard';
const axios = require('axios');

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateLocalUserDto) {
    return this.usersService.createLocalUser(createUserDto);
  }

  @Get('google')
  //@UseGuards(GoogleOauthGuard)
  googleLogin(@Res() res: Response) {
    res.redirect(this.authService.generateGoogleRedirectUrl());
  }

  @Get('callback/google')
  //@UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const { code } = req.query;

    const profile = await this.authService.getProfile(code);

    const user = await this.usersService.createGoogleUser({
      email: profile.email,
      name: profile.name,
      google_id: profile.id,
    });
    const loggedInUser = await this.authService.login(user);

    res.redirect(
      `http://localhost:4200/callback?token=${loggedInUser.access_token}&user_id=${loggedInUser.user_id}`
    );
  }
}