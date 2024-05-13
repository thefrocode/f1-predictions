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
  async login(@Request() req: any, @Res() res: Response) {
    const user = await this.authService.login(req.user);
    res.cookie('access_token', user.access_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'lax',
    });
    return res.send({ message: 'Login successful' });
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateLocalUserDto) {
    return this.usersService.createLocalUser(createUserDto);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  googleLogin() {}

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const user = await this.usersService.createGoogleUser({
      email: req.user.email,
      name: req.user.name,
      google_id: req.user.providerId,
    });
    const loggedInUser = await this.authService.login(user);
    res.cookie('access_token', loggedInUser.access_token, {
      httpOnly: true,
      path: '/',
    });

    res.redirect(process.env.FRONTEND_CALLBACK_URL || '');
  }
}
