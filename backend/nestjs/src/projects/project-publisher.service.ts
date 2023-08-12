import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProjectAddedEvent } from './events/project-added.event';
import { ProjectRemovedEvent } from './events/project-removed.event';
import { ProjectUpdatedEvent } from './events/project-updated.event';
import { AddProjectDto } from './dtos/add-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectPublisherService {
  constructor(private eventEmitter: EventEmitter2) {}

  publishProjectAddedEvent(payload: AddProjectDto): AddProjectDto {
    const projectAddedEvent = new ProjectAddedEvent();
    projectAddedEvent.title = payload.title;
    projectAddedEvent.description = payload.description;
    this.eventEmitter.emit('project.added', projectAddedEvent);
    return payload;
  }

  publishProjectUpdatedEvent(
    projectId: string,
    payload: UpdateProjectDto,
  ): UpdateProjectDto {
    const projectUpdatedEvent = new ProjectUpdatedEvent();
    projectUpdatedEvent.id = projectId;
    projectUpdatedEvent.title = payload.title;
    projectUpdatedEvent.description = payload.description;
    this.eventEmitter.emit('project.updated', projectUpdatedEvent);
    return payload;
  }

  publishProjectRemovedEvent(projectId: string): string {
    const projectRemovedEvent = new ProjectRemovedEvent();
    projectRemovedEvent.id = projectId;
    this.eventEmitter.emit('project.removed', projectRemovedEvent);
    return projectId;
  }
}
