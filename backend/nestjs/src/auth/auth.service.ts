import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  registerUser(payload: UserDto) {
    this.usersService.addUser(payload);
    return payload;
  }

  async validateUser(payload: UserDto) {
    const user = await this.usersService.getUserByUsername(payload.username);
    const match = await bcrypt.compare(payload.password, user.password);
    if (!user || !match) throw new UnauthorizedException();
    if (user && match) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
