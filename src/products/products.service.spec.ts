import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { DatabaseModule } from 'libs/database';
import { ProductsService } from 'src/products/products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let module: TestingModule;
  const name = faker.commerce.productName();
  let id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Product])],
      providers: [ProductsService],
    }).compile();

    service = await module.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates new product', async () => {
    const res = await service.create({
      name,
      price: Number(faker.commerce.price()),
    });
    id = res.id;
    expect(res.id).toBeTruthy();
  });

  it('queries products', () => {
    expect(service.findAll({ where: { name } })).resolves.toHaveLength(1);
  });

  it('queries a product by id', () => {
    expect(service.findOne(id)).resolves.toMatchObject({ name });
  });

  it('updates a product', async () => {
    const res = await service.update(id, { price: 100 });
    expect(res.affected).toBe(1);
  });

  it('removes a product', async () => {
    await service.remove(id);
    expect(service.findAll({ where: { name } })).resolves.toHaveLength(0);
  });
});
