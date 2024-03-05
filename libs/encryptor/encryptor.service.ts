import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

type IAttributes = {
  [key: string]: unknown;
};

@Injectable()
export class EncryptorService {
  secretKey: string;
  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get('SECRET_KEY');
  }

  getJWT(payload: IAttributes): string {
    return jsonwebtoken.sign(payload, this.secretKey);
  }

  verifyJWT(token: string): IAttributes | string {
    return jsonwebtoken.verify(token, this.secretKey);
  }
}
