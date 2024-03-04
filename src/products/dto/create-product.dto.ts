import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  inventory?: number;

  @IsNumber()
  price: number;
}
