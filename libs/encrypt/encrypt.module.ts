import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptService } from './encrypt.service';

const encryptFactory = {
  provide: 'EncryptService',
  useFactory: (configService: ConfigService) =>
    new EncryptService(configService),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local'],
    }),
  ],
  providers: [encryptFactory],
  exports: [encryptFactory],
})
export class EncryptModule {}
