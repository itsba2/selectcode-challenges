import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskAddedEvent } from './events/task-added.event';
import { TaskUpdatedEvent } from './events/task-updated.event';
import { TaskRemovedEvent } from './events/task-removed.event';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskListenerService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  @OnEvent('task.added')
  async handleTaskAddedEvent(event: TaskAddedEvent): Promise<void> {
    const newTask = this.tasksRepository.create({
      ...event,
      createdDate: Date.now().toString(),
    });
    await this.tasksRepository.save(newTask);
  }

  @OnEvent('task.updated')
  async handleTaskUpdatedEvent(event: TaskUpdatedEvent): Promise<void> {
    await this.tasksRepository.update(event.id, event);
  }

  @OnEvent('task.removed')
  async handleTaskRemovedEvent(taskId: TaskRemovedEvent): Promise<void> {
    await this.tasksRepository.delete(taskId);
  }
}
