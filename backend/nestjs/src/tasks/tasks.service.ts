import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskPublisherService } from './task-publisher.service';
import { AddTaskDto } from './dtos/add-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private taskPublisherService: TaskPublisherService,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Retrieve a list of tasks in a project.
  async getTasks(projectId: string): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { projectId } });
  }

  // Add a new task to a project.
  addTask(projectId: string, payload: AddTaskDto): AddTaskDto {
    return this.taskPublisherService.publishTaskAddedEvent({
      projectId,
      ...payload,
    });
  }

  // Retrieve the task given its ID.
  async getTaskById(taskId: string): Promise<Task> {
    return await this.tasksRepository.findOne({ where: { id: taskId } });
  }

  // Update the details of a task in a project.
  updateTask(taskId: string, payload: UpdateTaskDto): UpdateTaskDto {
    return this.taskPublisherService.publishTaskUpdatedEvent(taskId, payload);
  }

  // Remove a task from a project.
  removeTask(taskId: string): string {
    return this.taskPublisherService.publishTaskRemovedEvent(taskId);
  }
}
