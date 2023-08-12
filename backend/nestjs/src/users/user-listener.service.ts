import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UserAddedEvent } from './events/user-added.event';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserListenerService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @OnEvent('user.added')
  async handleUserAddedEvent(event: UserAddedEvent): Promise<void> {
    const newUser = this.usersRepository.create(event);
    await this.usersRepository.save(newUser);
  }
}
