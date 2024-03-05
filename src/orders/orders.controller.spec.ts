import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'libs/database';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

describe('OrdersController', () => {
  let controller: OrdersController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Order])],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  afterAll(() => {
    return module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
