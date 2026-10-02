import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const rota = req.originalUrl || req.url;
    console.log(`[LOG] Método: ${req.method} | Rota: ${rota}`);

      if(rota.includes('/admin')){
        const role = req.headers['x-user-role'];
        if(role !== 'administrator'){
          return res.status(403).json({
            statuscode:403,
            mensagem:'Acesso negado: Previlégio de supervisor necessário',
            log: new Date(),
          })
        }
      }

      if(rota.includes('/secret')){
        const role = req.headers['x-secret-role'];
        if(role !== 'secret'){
          return res.status(404).json({
            statuscode:404,
            mensagem:'Cannot found /secret',
            data:new Date()
          })
        }
      }

      next();
  }

}
