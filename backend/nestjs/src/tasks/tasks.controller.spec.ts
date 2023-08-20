import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;
  let projectsService: ProjectsService;

  // Common test data
  const reqUserId = { user: { id: 1 } };
  const projectId = '1';
  const taskId = '1';
  const falseUserId = 5;
  const falseProjectId = '5';
  const falseTaskId = '5';

  // Mock data
  const mockTasks = [
    {
      id: '1',
      projectId: '1',
      title: 'Task 1 of Project 1',
      description: 'Task 1 of Project 1 Description',
      createdDate: '1692474530713',
    },
    {
      id: '2',
      projectId: '1',
      title: 'Task 2 of Project 1',
      description: 'Task 2 of Project 1 Description',
      createdDate: '1692474530713',
    },
  ];
  const mockAddTaskBody = {
    projectId: '1',
    title: 'New Task of Project 1',
    description: 'New Task of Project 1 Description',
  };
  const mockUpdateTaskBody = {
    title: 'Updated Task of Project 1',
    description: 'Updated Task of Project Description',
  };
  const mockExistingTask = {
    id: '1',
    projectId: '1',
    title: 'Existing Task of Project 1',
    description: 'Existing Task of Project 1 Description',
    createdDate: '1692474530713',
  };
  const mockExistingProject = {
    id: '1',
    userId: '1',
    title: 'Existing Project',
    description: 'Existing Project description',
    createdDate: '1692474530713',
  };

  // Create testing module

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn(),
            addTask: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            removeTask: jest.fn(),
          },
        },
        {
          provide: ProjectsService,
          useValue: {
            getProjectById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // getTasks

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'getTasks').mockResolvedValue(mockTasks);

      const result = await controller.getTasks(reqUserId, projectId);
      expect(result).toEqual(mockTasks);
    });

    it('should throw NotFoundException if project is not found', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(undefined);

      await expect(
        controller.getTasks(reqUserId, projectId),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      await expect(
        controller.getTasks({ user: { id: falseUserId } }, projectId),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  // addTask

  describe('addTask', () => {
    it('should add a new task and return the new task details', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'addTask').mockReturnValue(mockAddTaskBody);

      const result = await controller.addTask(
        reqUserId,
        projectId,
        mockAddTaskBody,
      );

      expect(result).toEqual(mockAddTaskBody);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest.spyOn(service, 'getTaskById').mockResolvedValue(undefined);

      await expect(
        controller.addTask(reqUserId, projectId, mockAddTaskBody),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      await expect(
        controller.addTask(
          { user: { id: falseUserId } },
          projectId,
          mockAddTaskBody,
        ),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  // updateTask

  describe('updateTask', () => {
    it('should update an existing task and return the updated task details', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'getTaskById').mockResolvedValue(mockExistingTask);
      jest.spyOn(service, 'updateTask').mockReturnValue(mockUpdateTaskBody);

      const result = await controller.updateTask(
        reqUserId,
        projectId,
        taskId,
        mockUpdateTaskBody,
      );

      expect(result).toEqual(mockUpdateTaskBody);
    });

    it('should throw NotFoundException if project is not found', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(undefined);

      await expect(
        controller.updateTask(
          reqUserId,
          falseProjectId,
          taskId,
          mockUpdateTaskBody,
        ),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      jest.spyOn(service, 'getTaskById').mockResolvedValue(undefined);

      await expect(
        controller.updateTask(
          reqUserId,
          projectId,
          falseTaskId,
          mockUpdateTaskBody,
        ),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'getTaskById').mockResolvedValue(mockExistingTask);

      await expect(
        controller.updateTask(
          { user: { id: falseUserId } },
          projectId,
          taskId,
          mockUpdateTaskBody,
        ),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  // removeTask

  describe('removeTask', () => {
    it('should remove an existing task and return ID of removed task', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'getTaskById').mockResolvedValue(mockExistingTask);
      jest.spyOn(service, 'removeTask').mockReturnValue(taskId);

      const result = await controller.removeTask(reqUserId, projectId, taskId);

      expect(result).toEqual(taskId);
    });

    it('should throw NotFoundException if project is not found', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(undefined);

      await expect(
        controller.removeTask(reqUserId, falseProjectId, taskId),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException if task is not found', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);

      jest.spyOn(service, 'getTaskById').mockResolvedValue(undefined);

      await expect(
        controller.removeTask(reqUserId, projectId, falseTaskId),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw UnauthorizedException if user does not own the project', async () => {
      jest
        .spyOn(projectsService, 'getProjectById')
        .mockResolvedValue(mockExistingProject);
      jest.spyOn(service, 'getTaskById').mockResolvedValue(mockExistingTask);

      await expect(
        controller.removeTask({ user: { id: falseUserId } }, projectId, taskId),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
