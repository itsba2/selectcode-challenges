import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { AddProjectDto } from './dtos/add-project.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // GET /projects : Retrieve a list of all projects for a user.
  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll(@Request() req): Promise<Project[]> {
    return this.projectsService.getProjects(req.user.id);
  }

  // POST /projects : Add a new project.
  @UseGuards(AuthenticatedGuard)
  @Post()
  addProject(@Request() req, @Body() body: AddProjectDto): AddProjectDto {
    return this.projectsService.addProject({ userId: req.user.id, ...body });
  }

  // PUT /projects/:projectId Update the details of an existing project.
  @UseGuards(AuthenticatedGuard)
  @Put(':projectId')
  async updateProject(
    @Request() req,
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    // get existing project
    const project = await this.projectsService.getProjectById(projectId);
    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found');
    // if user does not own this project, don't allow update
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.projectsService.updateProject(projectId, body);
  }

  // DELETE /projects/:projectId : Remove a project.
  @UseGuards(AuthenticatedGuard)
  @Delete(':projectId')
  async removeProject(
    @Request() req,
    @Param('projectId') projectId: string,
  ): Promise<string> {
    // get existing project
    const project = await this.projectsService.getProjectById(projectId);
    // if project does not exist throw exception
    if (!project)
      throw new HttpException('Project not found.', HttpStatus.NOT_FOUND);
    // if user does not own this project, don't allow remove
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.projectsService.removeProject(projectId);
  }
}
