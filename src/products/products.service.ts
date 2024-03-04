import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository, FindManyOptions } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  findAll(option: FindManyOptions<Product> = {}) {
    return this.productsRepository.find(option);
  }

  findOne(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update({ id }, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository
      .findOne({ where: { id } })
      .then((product) => this.productsRepository.remove(product));
  }
}
