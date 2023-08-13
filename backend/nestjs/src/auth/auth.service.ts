import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registerUser(payload: UserDto) {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (user) throw new ConflictException();
    this.usersService.addUser(payload);
    return payload;
  }

  async validateUser(payload: UserDto) {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (!user) throw new NotFoundException('User not found.');
    const match = await bcrypt.compare(payload.password, user.password);
    if (!user || !match) throw new UnauthorizedException();
    if (user && match) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
