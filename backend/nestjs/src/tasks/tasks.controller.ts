import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { AddTaskDto } from './dtos/add-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Retrieve a list of tasks in a project.
  @Get()
  async getTasks(@Param('projectId') projectId: string): Promise<Task[]> {
    return await this.tasksService.getTasks(projectId);
  }

  // Add a new task to a project.
  @Post()
  addTask(
    @Param('projectId') projectId: string,
    @Body() payload: AddTaskDto,
  ): AddTaskDto {
    return this.tasksService.addTask(projectId, payload);
  }

  // Update the details of a task in a project.
  @Put(':taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() payload: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    const task = await this.tasksService.getTaskById(taskId);
    if (!task)
      throw new HttpException('Task does not exist.', HttpStatus.NOT_FOUND);
    return this.tasksService.updateTask(taskId, task);
  }

  // Remove a task from a project.
  @Delete(':taskId')
  async remove(@Param('taskId') taskId: string): Promise<string> {
    const task = await this.tasksService.getTaskById(taskId);
    if (!task)
      throw new HttpException('Task does not exist.', HttpStatus.NOT_FOUND);
    return this.tasksService.removeTask(taskId);
  }
}
