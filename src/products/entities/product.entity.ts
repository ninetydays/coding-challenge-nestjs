import {
  Entity,
  Column,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import type { Order } from 'src/orders/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column({ default: 3 })
  inventory: number;

  @Column({ default: 0 })
  price: number;

  @OneToMany('Order', 'product')
  orders: Relation<Order[]>;
}
