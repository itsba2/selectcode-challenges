import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserPublisherService } from './user-publisher.service';
import { UserListenerService } from './user-listener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserPublisherService, UserListenerService],
  exports: [UsersService],
})
export class UsersModule {}
