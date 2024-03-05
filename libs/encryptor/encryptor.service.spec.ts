import { Test, TestingModule } from '@nestjs/testing';
import { EncryptorModule } from './encryptor.module';
import { EncryptorService } from './encryptor.service';
import { faker } from '@faker-js/faker';

describe('EncryptorService', () => {
  let service: EncryptorService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EncryptorModule],
    }).compile();

    service = await module.get<EncryptorService>('EncryptorService');
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
