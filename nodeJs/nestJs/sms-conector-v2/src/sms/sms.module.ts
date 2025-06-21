/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PglNotificacionesSms, PglNotificacionesSmsSchema } from './schemas/pgl_notificaciones_sms.schema';
import { HttpModule } from '@nestjs/axios';
import { PglMicrobatallaSms, PglMicrobatallaSmsSchema } from './schemas/pgl_microbatalla_sms.schema';
import { PglFuncionalidades, PglFuncionalidadesSchema } from './schemas/pgl_funcionalidades.schema';
import { PglCreditoSms, PglCreditoSmsSchema } from './schemas/pgl_credito_sms.schema';
import { PglNotificacionesSmsRepository } from './repositories/pgl_notificaciones_sms.repository';
import { PglMicrobatallaRepository } from './repositories/pgl_microbatalla_sms.repository';
import { PglFuncionalidadesRepository } from './repositories/pgl_funcionalidades.repository';
import { PglCreditoSmsRepository } from './repositories/pgl_credito_sms.repository';
import config from '../config/config';

@Module({
  imports: [MongooseModule.forFeature([
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
      timeout: parseInt(config().EndPoint.timeOut)
    })
  })],
  controllers: [SmsController],
  providers: [SmsService, PglNotificacionesSmsRepository, PglMicrobatallaRepository, PglFuncionalidadesRepository, PglCreditoSmsRepository]
})
export class SmsModule { }
