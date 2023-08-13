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
  UseGuards,
  Request,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { AddTaskDto } from './dtos/add-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ProjectsService } from 'src/projects/projects.service';

@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
  ) {}

  // GET /projects/:projectId/tasks : Retrieve a list of tasks in a project.
  @UseGuards(AuthenticatedGuard)
  @Get()
  async getTasks(
    @Request() req,
    @Param('projectId') projectId: string,
  ): Promise<Task[]> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if user does not own this project, don't allow task add
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return await this.tasksService.getTasks(projectId);
  }

  // POST /projects/:projectId/tasks : Add a new task to a project.
  @UseGuards(AuthenticatedGuard)
  @Post()
  async addTask(
    @Request() req,
    @Param('projectId') projectId: string,
    @Body() body: AddTaskDto,
  ): Promise<AddTaskDto> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if user does not own this project, don't allow task add
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.tasksService.addTask(projectId, body);
  }

  // PUT /projects/:projectId/tasks/:taskId : Update the details of a task in a project.
  @UseGuards(AuthenticatedGuard)
  @Put(':taskId')
  async update(
    @Request() req,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // if user does not own this project, don't allow task update
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    // get existing task
    const task = await this.tasksService.getTaskById(taskId);

    // if task does not exist throw exception
    if (!task) throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);

    return this.tasksService.updateTask(taskId, body);
  }

  // DELETE /projects/:projectId/tasks/:taskId : Remove a task from a project.
  @UseGuards(AuthenticatedGuard)
  @Delete(':taskId')
  async remove(
    @Request() req,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<string> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // if user does not own this project, don't allow task update
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    // get existing task
    const task = await this.tasksService.getTaskById(taskId);

    // if task does not exist throw exception
    if (!task) throw new HttpException('Task not found.', HttpStatus.NOT_FOUND);

    return this.tasksService.removeTask(taskId);
  }
}
