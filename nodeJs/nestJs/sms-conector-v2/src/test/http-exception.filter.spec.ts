import { BadRequestException, ForbiddenException, HttpStatus, HttpVersionNotSupportedException } from "@nestjs/common";
import { HttpExceptionFilter } from "src/sms/filters/http-exception.filter";
import { constantError } from "src/utils/constantError";

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn()
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(HttpExceptionFilter).toBeDefined();
  });

  it('Process ForbiddenException', async () => {
    const obj = new HttpExceptionFilter();
    obj.catch(new ForbiddenException(constantError.SMS_ERROR.CODE_MSJ), mockArgumentsHost);
    expect(mockStatus).toBeCalledWith(HttpStatus.FORBIDDEN);
  });

  it('Process BadRequestException', async () => {
    const obj = new HttpExceptionFilter();
    obj.catch(new BadRequestException([constantError.SMS_ERROR.CODE_MSJ]), mockArgumentsHost);
    expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('Process NotImplementedException', async () => {
    const obj = new HttpExceptionFilter();
    obj.catch(new HttpVersionNotSupportedException(constantError.SMS_ERROR.CODE_MSJ), mockArgumentsHost);
    expect(mockStatus).toBeCalledWith(HttpStatus.HTTP_VERSION_NOT_SUPPORTED);
  });
});
