import { Injectable } from '@nestjs/common';
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
  addUser(payload: UserDto): UserDto {
    console.log('user service', payload);
    this.userPublisherService.publishUserAddedEvent(payload);
    return payload;
  }

  // Retrieve the project given its ID.
  async getUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
