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
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { AddProjectDto } from './dtos/add-project.dto';
import { RouteGuard } from '../auth/route.guard';

@UseGuards(RouteGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // GET /projects : Retrieve a list of all projects for a user.
  @Get()
  getProjects(@Req() req): Promise<Project[]> {
    return this.projectsService.getProjects(req.user.id);
  }

  // POST /projects : Add a new project.
  @Post()
  addProject(@Req() req, @Body() body: AddProjectDto): AddProjectDto {
    return this.projectsService.addProject({ userId: req.user.id, ...body });
  }

  // PUT /projects/:projectId Update the details of an existing project.
  @Put(':projectId')
  async updateProject(
    @Req() req,
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    // get existing project
    const project = await this.projectsService.getProjectById(projectId);
    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');
    // if user does not own this project, don't allow update
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.projectsService.updateProject(projectId, body);
  }

  // DELETE /projects/:projectId : Remove a project.
  @Delete(':projectId')
  async removeProject(
    @Req() req,
    @Param('projectId') projectId: string,
  ): Promise<string> {
    // get existing project
    const project = await this.projectsService.getProjectById(projectId);
    // if project does not exist throw exception
    if (!project) throw new NotFoundException('Project not found.');
    // if user does not own this project, don't allow remove
    if (req.user.id !== parseInt(project.userId))
      throw new UnauthorizedException();

    return this.projectsService.removeProject(projectId);
  }
}
