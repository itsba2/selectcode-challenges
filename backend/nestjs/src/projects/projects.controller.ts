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
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { AddProjectDto } from './dtos/add-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // Retrieve a list of all projects for a user.
  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  // Add a new project.
  @Post()
  addProject(@Body() payload: AddProjectDto): AddProjectDto {
    return this.projectsService.addProject(payload);
  }

  // Update the details of an existing project.
  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() payload: UpdateProjectDto,
  ): Promise<UpdateProjectDto> {
    const project = await this.projectsService.getProjectById(projectId);
    if (!project)
      throw new HttpException('Project does not exist.', HttpStatus.NOT_FOUND);
    return this.projectsService.updateProject(projectId, payload);
  }

  // Remove a project.
  @Delete(':projectId')
  async removeProject(@Param('projectId') projectId: string): Promise<string> {
    const project = await this.projectsService.getProjectById(projectId);
    if (!project)
      throw new HttpException('Project does not exist.', HttpStatus.NOT_FOUND);
    return this.projectsService.removeProject(projectId);
  }
}
