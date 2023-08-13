import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserAddedEvent } from './events/user-added.event';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserPublisherService {
  constructor(private eventEmitter: EventEmitter2) {}

  publishUserAddedEvent(payload: UserDto): string {
    const userAddedEvent = new UserAddedEvent();
    userAddedEvent.username = payload.username;
    userAddedEvent.password = payload.password;
    this.eventEmitter.emit('user.added', userAddedEvent);
    return payload.username;
  }
}
