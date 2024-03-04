import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { DatabaseModule } from 'libs/database';
import { UsersService } from 'src/users/users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;
  const email = faker.internet.email();
  let id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
      providers: [UsersService],
    }).compile();

    service = await module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates new user', async () => {
    const res = await service.create({
      email,
      password: 'password',
    });
    id = res.id;
    expect(res.id).toBeTruthy();
  });

  it('queries users', () => {
    expect(service.findAll({ where: { email } })).resolves.toHaveLength(1);
  });

  it('queries a user by id', () => {
    expect(service.findOne(id)).resolves.toMatchObject({ email });
  });

  it('updates a user', async () => {
    const res = await service.update(id, { deposit: 100 });
    expect(res.affected).toBe(1);
  });

  it('removes a user', async () => {
    await service.remove(id);
    expect(service.findAll({ where: { email } })).resolves.toHaveLength(0);
  });
});
