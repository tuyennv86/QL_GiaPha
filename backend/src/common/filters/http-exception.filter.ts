import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { message: string | string[]; error?: string };

    const isValidationError =
      typeof exceptionResponse === 'object' &&
      Array.isArray(exceptionResponse.message);

    response.status(status).json({
      statusCode: status,
      message: isValidationError
        ? 'Dữ liệu đầu vào không hợp lệ'
        : typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message,
      errors: isValidationError
        ? (exceptionResponse as { message: string[] }).message
        : undefined,
      timestamp: new Date().toISOString(),
    });
  }
}
