import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { UserAddedEvent } from './events/user-added.event';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserListenerService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @OnEvent('user.added')
  async handleUserAddedEvent(event: UserAddedEvent): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(event.password, saltRounds);
    const newUser = this.usersRepository.create({
      username: event.username,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
  }
}
