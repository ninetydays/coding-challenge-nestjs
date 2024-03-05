import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'libs/database';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

describe('OrdersController (e2e)', () => {
  let module: TestingModule;
  let app: INestApplication;
  let userRepository: Repository<User>;
  let productRepository: Repository<Product>;
  let orderRepository: Repository<Order>;
  let user: User;
  let product: Product;
  let order: Order;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        TypeOrmModule.forFeature([Order, User, Product]),
      ],
    }).compile();

    userRepository = module.get<Repository<User>>('UserRepository');
    productRepository = module.get<Repository<Product>>('ProductRepository');
    orderRepository = module.get<Repository<Order>>('OrderRepository');
    user = await userRepository.save({
      email: faker.internet.email(),
      password: 'password',
    });
    product = await productRepository.save({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
    order = await orderRepository.save({
      userId: user.id,
      productId: product.id,
    });
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await orderRepository.delete(order.id);
    await userRepository.delete(user.id);
    await productRepository.delete(product.id);
    await app.close();
    await module.close();
  });

  describe('with /orders router', () => {
    it('/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/orders/${order.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual(order);
        });
    });
  });
});
