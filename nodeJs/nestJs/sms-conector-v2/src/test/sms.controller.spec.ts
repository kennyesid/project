import { Test, TestingModule } from '@nestjs/testing';
import { SmsController } from '../sms/sms.controller';
import { SmsService } from '../sms/sms.service';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PglNotificacionesSms, PglNotificacionesSmsSchema } from '../sms/schemas/pgl_notificaciones_sms.schema';
import { HttpExceptionFilter } from '../sms/filters/http-exception.filter';
import { SmsModule } from '../sms/sms.module';
import { AppModule } from '../app.module';
import { PglNotificacionesSmsRepository } from '../sms/repositories/pgl_notificaciones_sms.repository';
import { PglMicrobatallaRepository } from '../sms/repositories/pgl_microbatalla_sms.repository';
import { PglFuncionalidadesRepository } from '../sms/repositories/pgl_funcionalidades.repository';
import { PglCreditoSmsRepository } from '../sms/repositories/pgl_credito_sms.repository';
import { PglMicrobatallaSms, PglMicrobatallaSmsSchema } from '../sms/schemas/pgl_microbatalla_sms.schema';
import { PglFuncionalidades, PglFuncionalidadesSchema } from '../sms/schemas/pgl_funcionalidades.schema';
import { PglCreditoSms, PglCreditoSmsSchema } from '../sms/schemas/pgl_credito_sms.schema';
import { Result } from 'src/sms/DTOs/result.dto';
import { DataSms, SendSms } from 'src/sms/DTOs/sendSms.dto';

describe('SmsController', () => {
  let controller: SmsController;
  let service: SmsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsController],
      providers: [SmsService, PglNotificacionesSmsRepository, PglMicrobatallaRepository, PglFuncionalidadesRepository, PglCreditoSmsRepository, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
      }],
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
      }), SmsModule, AppModule]
    }).compile();

    controller = module.get<SmsController>(SmsController);
    service = module.get<SmsService>(SmsService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Service should be declared', () => {
    expect(service).toBeDefined();
  });

  describe('Method that display initial message', () => {
    it('should show init message Servicio de SMS version 2', async () => {
      expect(controller.Inicio()).toBe("Servicio de SMS version 2");
    });
    it('should show message', async () => {
      expect(controller.Inicio()).not.toBe("Hola Mundo");
    });
  });

  describe('Method to send messages', () => {
    it('On successful', async () => {
      const result = new Result();
      result.data = { code: '' };
      const request = new SendSms();
      request.data = new DataSms();

      jest.spyOn(service, 'send').mockImplementation(async () => result);
      expect(await controller.Send(request,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined)).toEqual(result);
    });

    it('On  not successful', async () => {
      const result = new Result();
      result.data = { code: '' };
      const request = new SendSms();
      
      jest.spyOn(service, 'send').mockImplementation(async () => result);
      expect(await controller.Send(request,"Basic dUNvbnRhY3Q6JDJhJDEwJHpjdFFZYm1zazNna3NkYUpML1h3MnUvc1FPNzBiZWJIR2c1RFZnaW5VYzMzdjBwcU9hcDVx",undefined)).toEqual(result);
    });
  });

});
