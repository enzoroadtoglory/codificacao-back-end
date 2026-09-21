import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getStatus(): string {
    return '[SERVER] Servidor ativo';
  }

}
