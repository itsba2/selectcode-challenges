import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TaskAddedEvent } from './events/task-added.event';
import { TaskUpdatedEvent } from './events/task-updated.event';
import { TaskRemovedEvent } from './events/task-removed.event';
import { AddTaskDto } from './dtos/add-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskPublisherService {
  constructor(private eventEmitter: EventEmitter2) {}

  publishTaskAddedEvent(payload: AddTaskDto): AddTaskDto {
    const taskAddedEvent = new TaskAddedEvent();
    taskAddedEvent.projectId = payload.projectId;
    taskAddedEvent.title = payload.title;
    taskAddedEvent.description = payload.description;
    this.eventEmitter.emit('task.added', taskAddedEvent);
    return payload;
  }

  publishTaskUpdatedEvent(
    taskId: string,
    payload: UpdateTaskDto,
  ): UpdateTaskDto {
    const taskUpdatedEvent = new TaskUpdatedEvent();
    taskUpdatedEvent.id = taskId;
    taskUpdatedEvent.projectId = payload.projectId;
    taskUpdatedEvent.title = payload.title;
    taskUpdatedEvent.description = payload.description;
    this.eventEmitter.emit('task.updated', taskUpdatedEvent);
    return payload;
  }

  publishTaskRemovedEvent(taskId: string): string {
    const taskRemovedEvent = new TaskRemovedEvent();
    taskRemovedEvent.id = taskId;
    this.eventEmitter.emit('task.removed', taskRemovedEvent);
    return taskId;
  }
}
