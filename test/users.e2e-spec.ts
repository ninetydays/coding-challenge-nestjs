import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'libs/database';
import { User } from 'src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
  let module: TestingModule;
  let app: INestApplication;
  let userRepository: Repository<User>;
  let user: User;
  const email = faker.internet.email();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, TypeOrmModule.forFeature([User])],
    }).compile();

    userRepository = module.get<Repository<User>>('UserRepository');
    user = await userRepository.save({ email, password: 'password' });
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await userRepository.delete(user.id);
    await app.close();
    await module.close();
  });

  describe('with /users router', () => {
    it('/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(user);
        });
    });
  });
});
