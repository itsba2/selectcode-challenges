import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { ProjectAddedEvent } from './events/project-added.event';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectRemovedEvent } from './events/project-removed.event';
import { ProjectUpdatedEvent } from './events/project-updated.event';

@Injectable()
export class ProjectListenerService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  @OnEvent('project.added')
  async handleProjectAddedEvent(event: ProjectAddedEvent): Promise<void> {
    const newProject = this.projectsRepository.create({
      ...event,
      createdDate: Date.now().toString(),
    });
    await this.projectsRepository.save(newProject);
  }

  @OnEvent('project.updated')
  async handleProjectUpdatedEvent(event: ProjectUpdatedEvent): Promise<void> {
    await this.projectsRepository.update(event.id, event);
  }

  @OnEvent('project.removed')
  async handleProjectRemovedEvent(event: ProjectRemovedEvent): Promise<void> {
    await this.projectsRepository.delete(event);
  }
}
