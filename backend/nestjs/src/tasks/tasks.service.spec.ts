import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskPublisherService } from './task-publisher.service';

describe('ProjectsService', () => {
  let service: TasksService;
  let tasksRepository: Repository<Task>;
  let taskPublisherService: TaskPublisherService;

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
      providers: [
        TasksService,
        TaskPublisherService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    taskPublisherService =
      module.get<TaskPublisherService>(TaskPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getTasks

  describe('getTasks', () => {
    it('should return an array of projects', async () => {
      jest.spyOn(tasksRepository, 'find').mockResolvedValue(mockTasks);

      const result = await service.getTasks(projectId);

      expect(result).toEqual(mockTasks);
    });
  });

  // addTask

  describe('addTask', () => {
    it('should add a new task and return the new task details', () => {
      jest
        .spyOn(taskPublisherService, 'publishTaskAddedEvent')
        .mockReturnValue(mockAddTaskBody);

      const result = service.addTask(projectId, mockAddTaskBody);

      expect(result).toEqual(mockAddTaskBody);
    });
  });

  // updateTask

  describe('updateTask', () => {
    it('should update an existing task and return the updated project details', () => {
      jest
        .spyOn(taskPublisherService, 'publishTaskUpdatedEvent')
        .mockReturnValue(mockUpdateTaskBody);

      const result = service.updateTask(taskId, mockUpdateTaskBody);

      expect(result).toEqual(mockUpdateTaskBody);
    });
  });

  // removeTask

  describe('removeTask', () => {
    it('should remove an existing task and return the ID of removed task', () => {
      jest
        .spyOn(taskPublisherService, 'publishTaskRemovedEvent')
        .mockReturnValue(taskId);

      const result = service.removeTask(taskId);

      expect(result).toEqual(taskId);
    });
  });
});
