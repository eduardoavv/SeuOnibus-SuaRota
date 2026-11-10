
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import type { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro ao realizar operação no banco de dados.';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Já existe um registro com esse valor único.';
        break;

      case 'P2003':
      case 'P2011':
      case 'P2012':
      case 'P2014':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'Os dados enviados violam uma restrição do banco de dados.';
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Registro não encontrado.';
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      erro: exception.code,
      timestamp: new Date().toISOString(),
    });
  }
}
