import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as ReqI } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register : Register user
  @Post('register')
  registerUser(@Body() payload: UserDto) {
    return this.authService.registerUser(payload);
  }

  // POST /auth : Login user
  @UseGuards(LocalAuthGuard)
  @Post()
  loginUser(@Request() req: ReqI): any {
    return req.user;
  }

  // GET /auth/logout : Logout user
  @Get('logout')
  logoutUser(@Request() req): any {
    req.session.destroy();
    return { msg: 'logged out' };
  }
}
