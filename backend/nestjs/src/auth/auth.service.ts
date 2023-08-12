import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  registerUser(payload: UserDto) {
    this.usersService.addUser(payload);
    return payload;
  }

  async loginUser(payload: UserDto): Promise<any> {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (user?.password !== payload.password) throw new UnauthorizedException();
    const { password, ...result } = user;
    return result;
  }
}
