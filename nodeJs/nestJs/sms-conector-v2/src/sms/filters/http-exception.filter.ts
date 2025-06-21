import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { constantError } from '../../utils/constantError';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const error = exception.message.split("|");
        let detail;
        let errorType;
        
            
        switch (status) {
            case 400:
                if (error[0].includes("Unexpected")){
                    errorType=exception.name;
                    detail=[{
                        code: constantError.VALIDATION_ERROR.CODE,
                        description: error[0]
                    }];
                }
                else{
                    errorType=exception.message;
                    detail=this.getErrorDetail(exception["response"].message);
                }
                
                response
                    .status(status)
                    .json({
                        code: status.toString(),
                        errorType: errorType,
                        description: constantError.VALIDATION_ERROR.MSJ,
                        errorDetail: detail
                    });
                break;
            case 403:
                response
                    .status(status)
                    .json({
                        code: status.toString(),
                        errorType: exception.name,
                        description: error[1],
                        errorDetail: [{
                            code: error[0].toString(),
                            description: error[1]
                        }]
                    });
                break;
            default:
                response
                    .status(status)
                    .json({
                        code: status,
                        errorType: exception.name,
                        description: constantError.DEFAULT_ERROR.MSJ,
                        errorDetail: [{
                            code: constantError.DEFAULT_ERROR.CODE,
                            description: exception["response"].message
                        }
                        ]
                    });
        }
    }

    getErrorDetail(messageArray: [string]) {
        let errorDetail = [];
        messageArray.forEach(function (msj) {
            let objMessage = {
                code: constantError.VALIDATION_ERROR.CODE,
                description: msj
            };
            errorDetail.push(objMessage);
        });
        return errorDetail;
    }
}