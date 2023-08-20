import {
  Controller,
  Req,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { AddTaskDto } from './dtos/add-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ProjectsService } from '../projects/projects.service';
import { RouteGuard } from '../auth/route.guard';

@UseGuards(RouteGuard)
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
  ) {}

  // GET /projects/:projectId/tasks : Retrieve a list of tasks in a project.
  @Get()
  async getTasks(
    @Req() req,
    @Param('projectId') projectId: string,
  ): Promise<Task[]> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // if user does not own this project, don't allow task add
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return await this.tasksService.getTasks(projectId);
  }

  // POST /projects/:projectId/tasks : Add a new task to a project.
  @Post()
  async addTask(
    @Req() req,
    @Param('projectId') projectId: string,
    @Body() body: AddTaskDto,
  ): Promise<AddTaskDto> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // if user does not own this project, don't allow task add
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.tasksService.addTask(projectId, body);
  }

  // PUT /projects/:projectId/tasks/:taskId : Update the details of a task in a project.
  @Put(':taskId')
  async updateTask(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
    @Body() body: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // get existing task
    const task = await this.tasksService.getTaskById(taskId);

    // if task does not exist throw exception
    if (!task) throw new NotFoundException('Task not found.');

    // if user does not own this project, don't allow task update
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.tasksService.updateTask(taskId, body);
  }

  // DELETE /projects/:projectId/tasks/:taskId : Remove a task from a project.
  @Delete(':taskId')
  async removeTask(
    @Req() req,
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<string> {
    // get corresponding project
    const project = await this.projectsService.getProjectById(projectId);

    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');

    // get existing task
    const task = await this.tasksService.getTaskById(taskId);

    // if task does not exist throw exception
    if (!task) throw new NotFoundException('Task not found.');

    // if user does not own this project, don't allow task delete
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.tasksService.removeTask(taskId);
  }
}
