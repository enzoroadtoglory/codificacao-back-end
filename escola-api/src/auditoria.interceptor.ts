import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

const METODOS_AUDITADOS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class AuditoriaInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Auditoria');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();

    if (!METODOS_AUDITADOS.has(req.method)) {
      return next.handle();
    }

    const registro = (status: number) =>
      `${req.method} ${req.originalUrl} -> ${status} | ip=${req.ip}`;

    return next.handle().pipe(
      tap({
        next: () => this.logger.log(registro(http.getResponse<Response>().statusCode)),
        error: (erro: unknown) =>
          this.logger.warn(registro(erro instanceof HttpException ? erro.getStatus() : 500)),
      }),
    );
  }
}
