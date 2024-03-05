import { Test, TestingModule } from '@nestjs/testing';
import { EncryptModule } from './encrypt.module';
import { EncryptService } from './encrypt.service';
import { faker } from '@faker-js/faker';

describe('EncryptService', () => {
  let service: EncryptService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EncryptModule],
    }).compile();

    service = await module.get<EncryptService>('EncryptService');
  });

  afterAll(async () => {
    await module.close();
  });

  it('generates a JWT', () => {
    const payload = { key: faker.string.alphanumeric() };
    const token = service.getJWT(payload);
    expect(service.verifyJWT(token)['key']).toBe(payload.key);
  });
});
