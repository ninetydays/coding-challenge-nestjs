import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptorService } from './encryptor.service';

const encryptorFactory = {
  provide: 'EncryptorService',
  useFactory: (configService: ConfigService) =>
    new EncryptorService(configService),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env.local'],
    }),
  ],
  providers: [encryptorFactory],
  exports: [encryptorFactory],
})
export class EncryptorModule {}
