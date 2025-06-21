import { Test, TestingModule } from '@nestjs/testing';
import { SmsService } from '../sms/sms.service';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PglNotificacionesSms, PglNotificacionesSmsSchema } from '../sms/schemas/pgl_notificaciones_sms.schema';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../sms/filters/http-exception.filter';
import { Result } from '../sms/DTOs/result.dto';
import { DataSms, Metadata, SendSms } from '../sms/DTOs/sendSms.dto';
import { PglMicrobatallaSms, PglMicrobatallaSmsSchema } from '../sms/schemas/pgl_microbatalla_sms.schema';
import { PglFuncionalidades, PglFuncionalidadesSchema } from '../sms/schemas/pgl_funcionalidades.schema';
import { PglCreditoSms, PglCreditoSmsSchema } from '../sms/schemas/pgl_credito_sms.schema';
import { PglNotificacionesSmsRepository } from '../sms/repositories/pgl_notificaciones_sms.repository';
import { PglMicrobatallaRepository } from '../sms/repositories/pgl_microbatalla_sms.repository';
import { PglFuncionalidadesRepository } from '../sms/repositories/pgl_funcionalidades.repository';
import { PglCreditoSmsRepository } from '../sms/repositories/pgl_credito_sms.repository';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs/internal/observable/of';
import { ForbiddenException } from '@nestjs/common';


describe('SmsService Infobip', () => {
  let service: SmsService;
  let pglCreditoSmsRepository: PglCreditoSmsRepository;

  const response: AxiosResponse<any> = {
    data: `<?xml version="1.0" encoding="ISO-8859-1"?>
    <smsreport version="4.0">
        <date>2023-06-19 22:54:06 +0200</date>
        <result>error</result>
        <errorcode>-10</errorcode>
        <errormessage>access to this resource is not allowed from 177.222.46.146</errormessage>
    </smsreport>`,
    headers: {},
    config: { url: 'http://localhost:3000/mockUrl', headers: null },
    status: 200,
    statusText: 'OK',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService, SmsService, PglNotificacionesSmsRepository, PglMicrobatallaRepository, PglFuncionalidadesRepository, PglCreditoSmsRepository
        , {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of({
              data: `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                <s:Body>
                  <SendSmsResponse xmlns="http://tempuri.org/">
                    <SendSmsResult>4237877</SendSmsResult>
                  </SendSmsResponse>
                </s:Body>
              </s:Envelope>`
            })),
            get: jest.fn(() => of(response))
          },
        }
      ],
      imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        load: [config],
        isGlobal: true,
      }), MongooseModule.forRoot(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}?${process.env.MONGO_URL_CONFIG}`), MongooseModule.forFeature([
        {
          name: PglNotificacionesSms.name,
          schema: PglNotificacionesSmsSchema
        },
        {
          name: PglMicrobatallaSms.name,
          schema: PglMicrobatallaSmsSchema
        },
        {
          name: PglFuncionalidades.name,
          schema: PglFuncionalidadesSchema
        },
        {
          name: PglCreditoSms.name,
          schema: PglCreditoSmsSchema
        }
      ]), HttpModule.registerAsync({
        useFactory: () => ({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          timeout: 30000
        })
      })]
    }).compile();
    service = module.get<SmsService>(SmsService);
    pglCreditoSmsRepository = module.get<PglCreditoSmsRepository>(PglCreditoSmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('send 1', () => {
    it('should response unsuccessful', async () => {
      const sesion = "fdsafdsafdsfdsa";
      const request = new SendSms();
      request.data = new DataSms();
      request.metadata = new Metadata()
      request.data.phoneNumber = "71072788";
      request.data.message = "Banco Ganadero: mensaje de prueba";
      request.data.messageType = 3;
      request.data.requestorId = 1000;
      request.data.funcionalityId = 1;

      request.metadata.userCode = "JBK";
      request.metadata.branchCode = 70;
      request.metadata.applicationCode = 3;

      const result = new Result();
      result.data = { requestId: "10EDCA5F0D395350A156E1543C11FC44" };
      const resultSendMessage = await service.send(request, sesion,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined);
      expect(resultSendMessage).not.toEqual(result);
    });
  });

  describe('send 2', () => {
    it('should response unsuccessful', async () => {
      const sesion = "fdsafdsafdsfdsa";
      const request = new SendSms();
      request.data = new DataSms();
      request.metadata = new Metadata()
      request.data.phoneNumber = "71072788";
      request.data.message = "Banco Ganadero: mensaje de prueba";
      request.data.messageType = 2;
      request.data.requestorId = 1000;
      request.data.funcionalityId = 1;

      request.metadata.userCode = "JBK";
      request.metadata.branchCode = 70;
      request.metadata.applicationCode = 2;

      const result = new Result();
      result.data = { requestId: "10EDCA5F0D395350A156E1543C11FC44" };
      const resultSendMessage = await service.send(request, sesion,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined);
      expect(resultSendMessage).not.toEqual(result);
    });
  });

  describe('send 3', () => {
    it('should response unsuccessful', async () => {
      const sesion = "fdsafdsafdsfdsa";
      const request = new SendSms();
      request.data = new DataSms();
      request.metadata = new Metadata()
      request.data.phoneNumber = "71072788";
      request.data.message = "Banco Ganadero: mensaje de prueba";
      request.data.messageType = 2;
      request.data.requestorId = 1000;
      request.data.funcionalityId = 1;

      request.metadata.userCode = "JBK";
      request.metadata.branchCode = 70;
      request.metadata.applicationCode = 2;

      const result = new Result();
      result.data = { requestId: "10EDCA5F0D395350A156E1543C11FC44" };
      const pglCreditoSms = new PglCreditoSms();
      pglCreditoSms.CREDITO = 0;
      pglCreditoSms.ESTADO = 'C';

      jest.spyOn(pglCreditoSmsRepository, 'UpdateEstado').mockImplementation(async () => pglCreditoSms);
      jest.spyOn(pglCreditoSmsRepository, 'findOne').mockImplementation(async () => pglCreditoSms);
      jest.spyOn(pglCreditoSmsRepository, 'decrementCredito').mockImplementation(async () => pglCreditoSms);      
      try{
        await service.send(request, sesion,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined);
      }catch(exception){
        expect(exception).toBeInstanceOf(ForbiddenException);
      }
      
    });
  });

  describe('send 4', () => {
    it('should response unsuccessful', async () => {
      const sesion = "fdsafdsafdsfdsa";
      const request = new SendSms();
      request.data = new DataSms();
      request.metadata = new Metadata()
      request.data.phoneNumber = "71072788";
      request.data.message = "Banco Ganadero: mensaje de prueba";
      request.data.messageType = 2;
      request.data.requestorId = 1000;
      request.data.funcionalityId = 1;

      request.metadata.userCode = "JBK";
      request.metadata.branchCode = 70;
      request.metadata.applicationCode = 2;

      const result = new Result();
      result.data = { requestId: "10EDCA5F0D395350A156E1543C11FC44" };
      const pglCreditoSms = new PglCreditoSms();
      pglCreditoSms.CREDITO = 0;
      pglCreditoSms.ESTADO = 'C';

      jest.spyOn(pglCreditoSmsRepository, 'UpdateEstado').mockImplementation(async () => pglCreditoSms);
      jest.spyOn(pglCreditoSmsRepository, 'findOne').mockImplementation(async () => null);
      jest.spyOn(pglCreditoSmsRepository, 'decrementCredito').mockImplementation(async () => pglCreditoSms);
      try {
        await service.send(request, sesion,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined);
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });
  });

});
