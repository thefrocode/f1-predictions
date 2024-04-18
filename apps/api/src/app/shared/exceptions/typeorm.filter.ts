/* eslint-disable no-case-declarations */
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { IErrorMessage } from '../interfaces/error.interface';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message: string = (exception as TypeORMError).message;
    const code: string = (exception as any).code;
    const errNo: number = (exception as any).errno;
    let customResponse: IErrorMessage;
    console.log('Filter ' + message, code, errNo);

    switch (errNo) {
      case 1062:
        const messageArray = message.split(' ');
        let duplicateValue;
        if (messageArray[2].startsWith("'")) {
          duplicateValue = message.split("'")[1];
        } else {
          duplicateValue = messageArray[2];
        }
        const duplicateKey = messageArray[messageArray.length - 1]
          .slice(0, -8)
          .split('.')[1]
          .toUpperCase();
        customResponse = {
          status: 500,
          message: 'Something Went Wrong',
          type: 'Internal Server Error',
          error: {
            code: code,
            message: duplicateKey + ' ' + duplicateValue + ' already exists',
          },
          errorCode: 300,
          timestamp: new Date().toISOString(),
        };
        break;
      default:
        customResponse = {
          status: 500,
          message: 'Something Went Wrong',
          type: 'Internal Server Error',
          error: { code: code, message: message },
          errorCode: 300,
          timestamp: new Date().toISOString(),
        };
    }

    response.status(customResponse.status).json(customResponse);
  }
}
