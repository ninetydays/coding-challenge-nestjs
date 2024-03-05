import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { DatabaseModule } from 'libs/database';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let module: TestingModule;
  let userRepository: Repository<User>;
  let productRepository: Repository<Product>;
  const email = faker.internet.email();
  let user: User;
  let product: Product;
  let id: string;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Order, User, Product]),
      ],
      providers: [OrdersService],
    }).compile();

    service = await module.get<OrdersService>(OrdersService);
    userRepository = module.get<Repository<User>>('UserRepository');
    productRepository = module.get<Repository<Product>>('ProductRepository');
    user = await userRepository.save({ email, password: 'password' });
    product = await productRepository.save({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
  });

  afterAll(async () => {
    await userRepository.delete(user.id);
    await productRepository.delete(product.id);
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates new order', async () => {
    const res = await service.create({
      count: 1,
      userId: user.id,
      productId: product.id,
    });
    id = res.id;
    expect(res.id).toBeTruthy();
  });

  it('queries orders', async () => {
    expect(service.findAll({ where: { id } })).resolves.toHaveLength(1);
  });

  it('queries a order by id', () => {
    expect(service.findOne(id)).resolves.toMatchObject({
      count: 1,
      userId: user.id,
      productId: product.id,
    });
  });

  it('updates a order', async () => {
    const res = await service.update(id, { count: 2 });
    expect(res.affected).toBe(1);
  });

  it('removes a order', async () => {
    await service.remove(id);
    expect(service.findAll({ where: { id } })).resolves.toHaveLength(0);
  });
});
