import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';

/* Extra */
import { Request, Response } from 'express';
import { BaseError } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { filterRequestParams } from '../utils';

@Catch(BaseError)
export class SequelizeExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SequelizeExceptionFilter.name);
  catch(exception, host: ArgumentsHost) {
    this.logger.warn('=== SequelizeExceptionFilter ===');
    if (exception instanceof Error) this.logger.error(exception.stack);
    this.logger.error(exception);

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.PRECONDITION_FAILED;

    const timestamp = new Date().toISOString();

    const uuid = uuidv4();

    const params = filterRequestParams(request);

    this.logger.error({
      code: status,
      clientCode: uuid,
      message: exception.message,
      errors: exception['errors'] || [],
      path: request.path,
      params,
      timestamp,
    });

    response.status(status).json({
      message: exception.message,
      errors: exception['errors'] || [],
      path: request.path,
      params,
      timestamp,
    });
  }
}
