import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectPublisherService } from './project-publisher.service';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { AddProjectDto } from './dtos/add-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private projectPublisherService: ProjectPublisherService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  // Retrieve a list of all projects for a user.
  async getProjects(userId: string): Promise<Project[]> {
    return await this.projectsRepository.find({ where: { userId } });
  }

  // Add a new project.
  addProject(payload: AddProjectDto): AddProjectDto {
    this.projectPublisherService.publishProjectAddedEvent(payload);
    return payload;
  }

  // Retrieve the project given its ID.
  async getProjectById(projectId: string): Promise<Project> {
    return await this.projectsRepository.findOne({ where: { id: projectId } });
  }

  // Update the details of an existing project.
  updateProject(
    projectId: string,
    payload: UpdateProjectDto,
  ): UpdateProjectDto {
    this.projectPublisherService.publishProjectUpdatedEvent(projectId, payload);
    return payload;
  }

  // Remove a project.
  removeProject(projectId: string): string {
    this.projectPublisherService.publishProjectRemovedEvent(projectId);
    return projectId;
  }
}
