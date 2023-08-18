import { Controller, Req, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { LoginGuard } from './login.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register : Register user
  @Post('register')
  registerUser(@Body() body: UserDto) {
    return this.authService.registerUser(body);
  }

  // POST /auth : Login user
  @UseGuards(LoginGuard)
  @Post()
  loginUser(@Body() body: UserDto): any {
    return body;
  }

  // GET /auth/logout : Logout user
  @Get('logout')
  logoutUser(@Req() req): any {
    req.session.destroy();
    return { msg: 'logged out' };
  }
}
