import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'libs/database';
import { Product } from 'src/products/entities/product.entity';

describe('ProductsController (e2e)', () => {
  let module: TestingModule;
  let app: INestApplication;
  let productRepository: Repository<Product>;
  let product: Product;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, TypeOrmModule.forFeature([Product])],
    }).compile();

    productRepository = module.get<Repository<Product>>('ProductRepository');
    product = await productRepository.save({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await productRepository.delete(product.id);
    await app.close();
    await module.close();
  });

  describe('with /products router', () => {
    it('/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/products/${product.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(product);
        });
    });
  });
});
