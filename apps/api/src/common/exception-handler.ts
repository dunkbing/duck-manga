import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify/types/reply';
import { IncomingMessage } from 'http';

export const getStatusCode = (exception: any): number => {
  return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: any): string => {
  return exception instanceof HttpException ? exception.getResponse().toString() : String(exception);
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<IncomingMessage>();
    const statusCode = getStatusCode(exception);
    const message = getErrorMessage(exception);

    response.status(statusCode).send({
      success: false,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      code: statusCode,
      message,
    });
  }
}
