import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() payload: UserDto) {
    return this.authService.registerUser(payload);
  }

  @Post()
  loginUser(@Body() payload: UserDto) {
    return this.authService.loginUser(payload);
  }
}
