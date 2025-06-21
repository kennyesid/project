import { Body, Controller, Get, HttpCode, Post, UseFilters,Headers } from '@nestjs/common';

import { SmsService } from './sms.service';
import { v4 as uuidv4 } from 'uuid';
import { SendSms } from './DTOs/sendSms.dto';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('v2/sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    @HttpCode(200)
    @Get()
    Inicio() {
        return "Servicio de SMS version 2";
    }

    @HttpCode(201)
    @UseFilters(new HttpExceptionFilter())
    @Post("send")
    async Send(@Body() dto: SendSms,@Headers('authorization') autorization:string,@Headers('X-Credential-Client-ID') clientId:string) {

        let sesion = uuidv4();

        return this.smsService.send(dto, sesion,autorization,clientId);
    }
}
