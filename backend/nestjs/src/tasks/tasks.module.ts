import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskListenerService } from './task-listener.service';
import { TaskPublisherService } from './task-publisher.service';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [ProjectsModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService, TaskListenerService, TaskPublisherService],
})
export class TasksModule {}
