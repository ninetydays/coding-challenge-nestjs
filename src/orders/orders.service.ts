import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository, FindManyOptions } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.ordersRepository.save(createOrderDto);
  }

  findAll(option: FindManyOptions<Order> = {}) {
    return this.ordersRepository.find(option);
  }

  findOne(id: string) {
    return this.ordersRepository.findOne({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.update({ id }, updateOrderDto);
  }

  remove(id: string) {
    return this.ordersRepository
      .findOne({ where: { id } })
      .then((order) => this.ordersRepository.remove(order));
  }
}
