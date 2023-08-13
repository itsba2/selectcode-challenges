import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPublisherService } from './user-publisher.service';
import { User } from './entities/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private userPublisherService: UserPublisherService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Add a new user.
  addUser(payload: UserDto): string {
    this.userPublisherService.publishUserAddedEvent(payload);
    return payload.username;
  }

  // Retrieve the user given its username.
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
