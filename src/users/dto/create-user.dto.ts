import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsOptional()
  deposit?: number;
}
