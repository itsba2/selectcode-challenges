import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectPublisherService } from './project-publisher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectsRepository: Repository<Project>;
  let projectPublisherService: ProjectPublisherService;

  // Common test data
  const userId = '1';
  const projectId = '1';

  // Mock data
  const mockProjects = [
    {
      id: '1',
      userId: '1',
      title: 'Project 1',
      description: 'Project1 Description',
      createdDate: '1692474530713',
    },
  ];
  const mockAddProjectBody = {
    userId: '1',
    title: 'New Project',
    description: "New Project's description",
  };
  const mockUpdateProjectBody = {
    title: 'Updated Project',
    description: 'Updated Project description',
  };

  // Create testing module

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        ProjectPublisherService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectsRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
    projectPublisherService = module.get<ProjectPublisherService>(
      ProjectPublisherService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getProjects

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      jest.spyOn(projectsRepository, 'find').mockResolvedValue(mockProjects);

      const result = await service.getProjects(userId);

      expect(result).toEqual(mockProjects);
    });
  });

  // addProject

  describe('addProject', () => {
    it('should add a new project and return the new project details', () => {
      jest
        .spyOn(projectPublisherService, 'publishProjectAddedEvent')
        .mockReturnValue(mockAddProjectBody);

      const result = service.addProject(mockAddProjectBody);

      expect(result).toEqual(mockAddProjectBody);
    });
  });

  // updateProject

  describe('updateProject', () => {
    it('should update an existing project and return the updated project details', () => {
      jest
        .spyOn(projectPublisherService, 'publishProjectUpdatedEvent')
        .mockReturnValue(mockUpdateProjectBody);

      const result = service.updateProject(projectId, mockUpdateProjectBody);

      expect(result).toEqual(mockUpdateProjectBody);
    });
  });

  // removeProject

  describe('removeProject', () => {
    it('should remove an existing project and return the ID of removed project', () => {
      jest
        .spyOn(projectPublisherService, 'publishProjectRemovedEvent')
        .mockReturnValue(projectId);

      const result = service.removeProject(projectId);

      expect(result).toEqual(projectId);
    });
  });
});
