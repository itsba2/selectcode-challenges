import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserPublisherService } from './user-publisher.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;
  let userPublisherService: UserPublisherService;

  // Mock data
  const mockUsername = 'user';
  const mockPassword = 'change.me';

  // Create testing module

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UserPublisherService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userPublisherService =
      module.get<UserPublisherService>(UserPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // addUser

  describe('addUser', () => {
    it('should add new user and return the username', () => {
      jest
        .spyOn(userPublisherService, 'publishUserAddedEvent')
        .mockReturnValue(mockUsername);

      const result = service.addUser({
        username: mockUsername,
        password: mockPassword,
      });

      expect(result).toEqual(mockUsername);
    });
  });
});
