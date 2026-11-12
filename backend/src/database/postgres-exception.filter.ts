
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';

  import { QueryFailedError } from 'typeorm';
  import type { Response } from 'express';

  @Catch(QueryFailedError)
  export class PostgresExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const response = host.switchToHttp().getResponse<Response>();

      const codigo = (
        exception as QueryFailedError & {
          driverError?: { code?: string };
        }
      ).driverError?.code;

      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Erro ao realizar operação no banco de dados.';

      switch (codigo) {
        case '23505':
          status = HttpStatus.CONFLICT;
          message = 'Já existe um registro com esse valor único.';
          break;

        case '23503':
        case '23502':
        case '23514':
          status = HttpStatus.UNPROCESSABLE_ENTITY;
          message =
            'Os dados enviados violam uma restrição do banco de dados.';
          break;
      }

      response.status(status).json({
        statusCode: status,
        message,
        erro: codigo ?? 'UNKNOWN',
        timestamp: new Date().toISOString(),
      });
    }
  }
