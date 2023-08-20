import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';
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

  async validateUser(username: string, password: string) {
    // Check if user exists
    const user = await this.usersService.getUserByUsername(username);
    if (!user) throw new NotFoundException('User not found.');

    // Check if passwords match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
