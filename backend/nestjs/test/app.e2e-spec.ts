import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as passport from 'passport';
import * as session from 'express-session';

describe('Application (e2e)', () => {
  let app: INestApplication;

  const testAuthBody = {
    username: 'test_user',
    password: 'test_password',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 10 * 60 * 1000, // 10 minutes
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('POST /auth/register', () => {
    it('should register user', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testAuthBody)
        .expect(HttpStatus.CREATED);
    });

    it('should throw ConflictException if user already exists', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(testAuthBody)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('POST /auth/login', () => {
    it('should login user', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send(testAuthBody)
        .expect(HttpStatus.CREATED);
    });

    it('should throw NotFoundException if user not found', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'wrong_username',
          password: 'test_password',
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should throw UnauthorizedException if user provides wrong password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'test_user',
          password: 'wrong_password',
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /auth/logout', () => {
    it('should logout user', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/logout')
        .expect(HttpStatus.OK);

      expect(response.body).toEqual({ msg: 'logged out' });
    });
  });
});
