import { IsNumber, IsUUID } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  count: number;

  @IsUUID()
  userId: string;

  @IsUUID()
  productId: string;
}
