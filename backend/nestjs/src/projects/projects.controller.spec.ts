import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  // Common test data
  const mockReqUserId = { user: { id: 1 } };
  const userId = '1';
  const projectId = '1';
  const falseUserId = '5';
  const falseProjectId = '5';

  // Mock data
  const mockProjects = [
    {
      id: '1',
      userId,
      title: 'Project 1',
      description: 'Project1 Description',
      createdDate: '1692474530713',
    },
  ];
  const mockAddProjectBody = {
    userId,
    title: 'New Project',
    description: "New Project's description",
  };
  const mockUpdateProjectBody = {
    title: 'Updated Project',
    description: 'Updated Project description',
  };
  const mockExistingProject = {
    id: '1',
    userId: '1',
    title: 'Existing Project',
    description: 'Existing Project description',
    createdDate: '1692474530713',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            getProjects: jest.fn(),
            addProject: jest.fn(),
            getProjectById: jest.fn(),
            updateProject: jest.fn(),
            removeProject: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      jest.spyOn(service, 'getProjects').mockResolvedValue(mockProjects);

      const result = await controller.getProjects(mockReqUserId);
      expect(result).toEqual(mockProjects);
    });
  });

  describe('addProject', () => {
    it('should add a new project', async () => {
      jest.spyOn(service, 'addProject').mockReturnValue(mockAddProjectBody);

      const result = controller.addProject(mockReqUserId, mockAddProjectBody);

      expect(result).toEqual(mockAddProjectBody);
    });
  });

  describe('updateProject', () => {
    it('should update an existing project', async () => {
      jest
        .spyOn(service, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest
        .spyOn(service, 'updateProject')
        .mockReturnValue(mockUpdateProjectBody);

      const result = await controller.updateProject(
        mockReqUserId,
        projectId,
        mockUpdateProjectBody,
      );

      expect(result).toEqual(mockUpdateProjectBody);
    });

    it('should throw NotFoundException if project is not found', async () => {
      jest.spyOn(service, 'getProjectById').mockResolvedValue(undefined);

      await expect(
        controller.updateProject(
          mockReqUserId,
          falseProjectId,
          mockUpdateProjectBody,
        ),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(service, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      await expect(
        controller.updateProject(
          { user: { id: falseUserId } },
          projectId,
          mockUpdateProjectBody,
        ),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('removeProject', () => {
    it('should remove an existing project', async () => {
      jest
        .spyOn(service, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'removeProject').mockReturnValue(projectId);

      const result = await controller.removeProject(mockReqUserId, projectId);

      expect(result).toBe(projectId);
    });

    it('should throw NotFoundException if project is not found', async () => {
      jest.spyOn(service, 'getProjectById').mockResolvedValue(undefined);

      await expect(
        controller.removeProject(mockReqUserId, falseProjectId),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(service, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      await expect(
        controller.removeProject({ user: { id: falseUserId } }, projectId),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
