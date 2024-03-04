import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import type { User } from 'src/users/entities/user.entity';
import type { Product } from 'src/products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 1 })
  count: number;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: 'paymant' })
  status: string;

  @ManyToOne('User', 'orders')
  user: Relation<User>;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne('Product', 'orders')
  product: Relation<Product>;

  @Column({ type: 'uuid', nullable: true })
  productId: string;
}
