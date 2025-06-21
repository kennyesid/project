import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { XMLParser } from 'fast-xml-parser';
import { AxiosError } from 'axios';
import config from '../config/config';

import { PglNotificacionesSms } from './schemas/pgl_notificaciones_sms.schema';
import { SendSms } from './DTOs/sendSms.dto';
import { Result } from './DTOs/result.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { constantError } from '../utils/constantError';
import { constant, estado } from '../utils/constant';

import { PglCreditoSms } from './schemas/pgl_credito_sms.schema';
import { PglNotificacionesSmsRepository } from './repositories/pgl_notificaciones_sms.repository';
import { PglFuncionalidadesRepository } from './repositories/pgl_funcionalidades.repository';
import { PglCreditoSmsRepository } from './repositories/pgl_credito_sms.repository';
import { PglMicrobatallaRepository } from './repositories/pgl_microbatalla_sms.repository';

@Injectable()
export class SmsService {
    private readonly logger = new Logger(SmsService.name);
    private readonly parseXML = new XMLParser();
    private proveedorSms: string;
    private validaLimiteCredito: boolean;
    private idTigo: string;
    private msgParts: string;
    constructor(@Inject(config.KEY)
    private configService: ConfigType<typeof config>,
        private http: HttpService,

        private readonly notificationSmsRepository: PglNotificacionesSmsRepository,
        private readonly funcionalidadesRepository: PglFuncionalidadesRepository,
        private readonly microbatallaSmsRepository: PglMicrobatallaRepository,
        private readonly creditoSmsRepository: PglCreditoSmsRepository
    ) { }

    async send(dto: SendSms, sesion: string, autorization: string, clientId: string) {
        let result: Result;

        this.logger.log(this.send.name + " INICIO: ", { dto }, sesion, { autorization }, { clientId });

        const cargaCreditoSchema = await this.getCreditoSmsForUpdate(dto, sesion, autorization, clientId);
        this.logger.log("VALIDACION DEL CAMPO VALIDA_LIMITE_CREDITO CON VALOR: ", this.validaLimiteCredito.toString());
        if (this.configService.ProviderIsTigo == "S") {
            result = await this.sendByTigo(dto, sesion);
            this.logger.log(this.send.name + " F1: ", JSON.stringify(result));

            if (result.code === '500') return result;

            if (result.code) {
                result = await this.sendByInfobip(dto, sesion);
                this.logger.log(this.send.name + " F2: ", JSON.stringify(result));
            } else {
                this.idTigo = result.data.requestId;
                this.msgParts = '1';
                await this.registerNotificationWithID("success", dto, sesion);
            }
        }
        else {
            result = await this.sendByInfobip(dto, sesion);
            this.logger.log(this.send.name + " F3: ", JSON.stringify(result));
        }
        this.logger.log("VALIDACION DEL CAMPO /VALIDA_LIMITE_CREDITO/ CON VALOR: ", this.validaLimiteCredito.toString());
        if (!result.code) {
            if (this.validaLimiteCredito) {
                this.logger.log(this.send.name + " F4: ", JSON.stringify(result));
                const resultDecrement = await this.creditoSmsRepository.decrementCredito(cargaCreditoSchema);
                this.logger.log(this.send.name + " F4: ", JSON.stringify(resultDecrement));
            }
        }

        this.logger.log(this.send.name + " FIN: ", JSON.stringify(result));

        return result;
    }
    private async getCreditoSmsForUpdate(dto: SendSms, sesion: string, autorization: string, clientId: string): Promise<PglCreditoSms> {
        let resultUpdate;
        let creditoResult;
        let creditoSmsInactivo;
        this.logger.log(this.getCreditoSmsForUpdate.name + " INICIO: ", dto, sesion);
        const functionality = await this.funcionalidadesRepository.findOne(dto.data.funcionalityId);
        this.logger.log(this.getCreditoSmsForUpdate.name + " F1: ", JSON.stringify(functionality), sesion);

        if (!functionality) {
            throw new ForbiddenException(constantError.FUNCIONALITY_ERROR.CODE_MSJ);
        }
        const date = new Date();
        // CAMBIOS YESID 14/08/2023 - SE VA A VALIDA QUE LA TABLA PGL_MICROBATALLA_SMS EL CAMPO VALIDA_LIMITE_CREDITO ESTE EN TRUE O FALSE
        let microBatallaSmsFlag = await this.microbatallaSmsRepository.findOne(functionality.COD_MICROBATALLA);
        this.logger.log("VALIDACION DEL CAMPO /COD_MICROBATALLA_SMS/ CON VALOR: ", microBatallaSmsFlag);
        this.logger.log("VALIDACION DEL CAMPO /COD_MICROBATALLA_SMS_PRUEBA/");
        if (!microBatallaSmsFlag) {
            throw new ForbiddenException(constantError.VALIDATION_FLAG_ERROR.CODE_MSJ);
        }

        this.validaLimiteCredito = microBatallaSmsFlag.VALIDA_LIMITE_CREDITO == undefined ? true : microBatallaSmsFlag.VALIDA_LIMITE_CREDITO;
        if (!this.validaLimiteCredito) return null;

        // FIN CAMBIOS YESID

        creditoResult = await this.creditoSmsRepository.findOne(functionality.COD_MICROBATALLA, estado.ACTIVO, date.getMonth() + 1, date.getFullYear().toString());
        this.logger.log(this.getCreditoSmsForUpdate.name + " F2: ", JSON.stringify(creditoResult), sesion);

        if (!creditoResult) {
            creditoSmsInactivo = await this.creditoSmsRepository.findOne(functionality.COD_MICROBATALLA, estado.INACTIVO, date.getMonth() + 1, date.getFullYear().toString());
            this.logger.log(this.getCreditoSmsForUpdate.name + " F2: ", JSON.stringify(creditoSmsInactivo), sesion);

            if (!creditoSmsInactivo)
                throw new ForbiddenException(constantError.SMS_ERROR.CODE_MSJ);

            creditoSmsInactivo.ESTADO = estado.ACTIVO;
            creditoResult = await this.creditoSmsRepository.UpdateEstado(creditoSmsInactivo);

        }

        if (creditoResult.CREDITO <= 0) {
            creditoSmsInactivo = await this.creditoSmsRepository.findOne(functionality.COD_MICROBATALLA, estado.INACTIVO, date.getMonth() + 1, date.getFullYear().toString());
            this.logger.log(this.getCreditoSmsForUpdate.name + " F2: ", JSON.stringify(creditoSmsInactivo), sesion);

            if (!creditoSmsInactivo) {
                creditoResult.ESTADO = estado.CERRADO;
                await this.creditoSmsRepository.UpdateEstado(creditoResult);
                throw new ForbiddenException(constantError.SMS_ERROR.CODE_MSJ);
            }
            creditoResult.ESTADO = estado.CERRADO;
            resultUpdate = await this.creditoSmsRepository.UpdateEstado(creditoResult);
            this.logger.log(this.getCreditoSmsForUpdate.name + " F2: ", JSON.stringify(resultUpdate), sesion);
            creditoSmsInactivo.ESTADO = estado.ACTIVO;
            creditoResult = await this.creditoSmsRepository.UpdateEstado(creditoSmsInactivo);
            this.logger.log(this.getCreditoSmsForUpdate.name + " F2: ", JSON.stringify(creditoResult), sesion);
            if (!resultUpdate && !creditoResult)
                throw new ForbiddenException(constantError.SEND_ERROR.CODE_MSJ);
        }

        if (!await this.validateUserNameAndFuncionalityId(autorization, clientId, creditoResult))
            throw new ForbiddenException(constantError.VALIDATION_AUTH_ERROR.CODE_MSJ);

        this.logger.log(this.getCreditoSmsForUpdate.name + " FIN: ", JSON.stringify(creditoResult), sesion);

        return creditoResult;

    }
    private async validateUserNameAndFuncionalityId(autorization: string, clientId: string, creditoSms: PglCreditoSms): Promise<boolean> {
        let result = false;
        let microBatallaResult = await this.microbatallaSmsRepository.findOne(creditoSms.COD_MICROBATALLA);

        if (microBatallaResult) {
            if (clientId) {
                if (microBatallaResult.ACCESO_USUARIO == clientId) {
                    result = true;
                }
            } else if (autorization) {
                const resultDecode = Buffer.from(autorization.split(' ')[1], 'base64').toString('utf8');
                const username = resultDecode.split(':')[0];

                if (microBatallaResult.ACCESO_USUARIO == username)
                    result = true;
            }
        }

        return result;
    }

    private async sendByTigo(dto: SendSms, sesion: string): Promise<Result> {
        let result = new Result();
        let resultJson: { smsreport: { result: string; msgid: any; }; };

        this.proveedorSms = constant.TIGO;
        let paramFrom = dto.metadata.applicationCode.toString().padStart(13, '0');
        this.logger.log(this.sendByTigo.name + " INICIO: ", dto);
        let url = await this.getUrlByMessageType(dto, paramFrom);

        try {
            const { data } = await firstValueFrom(this.http.get<any>(url)
                .pipe(catchError(async (err: AxiosError) => {
                    this.logger.error(this.sendByTigo.name + " ERROR response: ", JSON.stringify(err));
                    throw new ForbiddenException(err.message);
                })));

            this.logger.log(this.sendByTigo.name + " F1: ", data);
            resultJson = this.parseXML.parse(data);
            if (resultJson.smsreport.result !== "error")
                result.data = { requestId: resultJson.smsreport.msgid };
            else {
                result.code = constantError.EXTERNAL_ERROR.CODE;
                result.errorType = "BAD ERROR";
                result.description = constantError.EXTERNAL_ERROR.MSJ;
            }
            this.logger.log(this.sendByTigo.name + " F2: ", resultJson);
            await this.registerNotification(resultJson.smsreport.result, dto, sesion);
            this.logger.log(this.sendByTigo.name + " F3: ", JSON.stringify(result));
        } catch (err) {
            result.code = '500';
            result.errorType = "BAD ERROR";
            result.description = constantError.EXTERNAL_ERROR.MSJ;
        }
        return result;
    }
    private async sendByInfobip(dto: SendSms, sesion: string) {
        let result = new Result();
        let resultJson: { [x: string]: { [x: string]: { SendSmsResponse: { SendSmsResult: any; }; }; }; };
        this.proveedorSms = constant.INFOBIP;
        let resultStatus = "success";
        let parameters = {
            number: dto.data.phoneNumber,
            sender: this.configService.Infobip.sender,
            message: dto.data.message
        };
        this.logger.log(this.sendByInfobip.name + " INICIO: ", dto);

        const { data } = await firstValueFrom(this.http
            .post<any>(this.configService.Infobip.endPoint,
                this.xmlResponse(parameters),
                this.configRequestHeader())
            .pipe(catchError((error: AxiosError) => {
                this.logger.error(this.sendByInfobip.name + " ERROR response: ", JSON.stringify(error));
                throw new ForbiddenException(error);
            })));

        resultJson = this.parseXML.parse(data);
        this.logger.log(this.sendByInfobip.name + " F1: ", resultJson);
        await this.registerNotification(resultStatus, dto, sesion);
        result.data = { requestId: resultJson["s:Envelope"]["s:Body"].SendSmsResponse.SendSmsResult }

        this.logger.log(this.sendByInfobip.name + " FIN: ", result);
        return result;
    }
    private async getUrlByMessageType(sendSmsDto: SendSms, paramFrom: string) {

        let url = `${this.configService.Tigo.endPoint}?version=${this.configService.Tigo.version}&cid=${this.configService.Tigo.cid}&password=${this.configService.Tigo.password}&to=00591${sendSmsDto.data.phoneNumber}&from=${paramFrom}&content=${sendSmsDto.data.message}`;
        this.logger.log(this.getUrlByMessageType.name + " INICIO: ", url);
        switch (sendSmsDto.data.messageType) {
            case 2:
                url = url + `&targetformat=COMMON.1.2`;
                break;
            case 3:
                url = url + `&coding=UTF8&gsm_coding=UCS2`;
                break;
            default:

        }

        this.logger.log(this.getUrlByMessageType.name + " FIN: ", url);
        return url;

    }
    private async registerNotification(resultStatus: any, dto: SendSms, sesion: string): Promise<PglNotificacionesSms> {
        let estado: string;
        switch (resultStatus) {
            case 'success':
                estado = 'E';
                break;
            case '-10':
                estado = 'R';
                break;

            default:
                estado = 'R';
                break;
        }

        return this.notificationSmsRepository.save(resultStatus, estado, dto, sesion, this.proveedorSms);
    }
    private async registerNotificationWithID(resultStatus: any, dto: SendSms, sesion: string): Promise<PglNotificacionesSms> {
        let estado: string;
        switch (resultStatus) {
            case 'success':
                estado = 'E';
                break;
            case '-10':
                estado = 'R';
                break;

            default:
                estado = 'R';
                break;
        }

        return this.notificationSmsRepository.saveWithID(resultStatus, estado, dto, sesion, this.proveedorSms, this.idTigo, this.msgParts);
    }
    xmlResponse(parameters: any) {
        return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
           <tem:SendSms>
              <tem:telefono>${parameters.number}</tem:telefono>
              <tem:sender>${parameters.sender}</tem:sender>
              <tem:mensaje>${parameters.message}</tem:mensaje>
           </tem:SendSms>
        </soapenv:Body>
        </soapenv:Envelope>`
    };

    private configRequestHeader() {
        return {
            headers: {
                'SOAPAction': this.configService.Infobip.soapAction,
                'Content-Type': `text/xml; charset=utf-8`
            }
        }
    }

}
