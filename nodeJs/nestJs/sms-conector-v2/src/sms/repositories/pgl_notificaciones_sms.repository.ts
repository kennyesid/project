import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DateTimeUtil } from "../../utils/datetime.util";
import { SendSms } from "../DTOs/sendSms.dto";
import { PglNotificacionesSms } from "../schemas/pgl_notificaciones_sms.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PglNotificacionesSmsRepository {
    private readonly dateTimeUtil = new DateTimeUtil();
    constructor(@InjectModel(PglNotificacionesSms.name) private notificacionesSmsModel: Model<PglNotificacionesSms>) {

    }

    async save(resultStatus: any, estado: string, dto: SendSms, sesion: string, proveedorSms: string): Promise<PglNotificacionesSms> {
        let dateTime = await this.dateTimeUtil.getDateTime();
        const createNotification = new this.notificacionesSmsModel({
            NRO_DESTINATARIO: dto.data.phoneNumber,
            COD_TIPO_IDENTIFICACION: dto.data.messageType,
            PROVEEDOR_SMS: proveedorSms,
            FECHA_ENVIO: dateTime.date,
            HORA_ENVIO: dateTime.time,
            SESION: sesion,
            FECHA_CONFIRMACION: null,
            HORA_CONFIRMACION: null,
            MENSAJE: dto.data.message,
            MSGID: null,
            MSGPARTS: null,
            CUERPO_ENVIO: JSON.stringify(dto),
            CUERPO_CONFIRMACION: null,
            COD_ESTADO: estado,
            COD_USUARIO: dto.metadata.userCode,
            COD_SUCURSAL: dto.metadata.branchCode,
            COD_APLICACION: dto.metadata.applicationCode,
            TZ_LOCK: 0,
            NRO_SOLICITUD: dto.data.requestorId,
            COD_FUNCIONALIDAD: dto.data.funcionalityId
        });
        return createNotification.save();

    }
    async saveWithID(resultStatus: any, estado: string, dto: SendSms, sesion: string, proveedorSms: string, idTigo: string, msgParts: string): Promise<PglNotificacionesSms> {
        let dateTime = await this.dateTimeUtil.getDateTime();
        const createNotification = new this.notificacionesSmsModel({
            NRO_DESTINATARIO: dto.data.phoneNumber,
            COD_TIPO_IDENTIFICACION: dto.data.messageType,
            PROVEEDOR_SMS: proveedorSms,
            FECHA_ENVIO: dateTime.date,
            HORA_ENVIO: dateTime.time,
            SESION: sesion,
            FECHA_CONFIRMACION: null,
            HORA_CONFIRMACION: null,
            MENSAJE: dto.data.message,
            MSGID: idTigo,
            MSGPARTS: msgParts,
            CUERPO_ENVIO: JSON.stringify(dto),
            CUERPO_CONFIRMACION: null,
            COD_ESTADO: estado,
            COD_USUARIO: dto.metadata.userCode,
            COD_SUCURSAL: dto.metadata.branchCode,
            COD_APLICACION: dto.metadata.applicationCode,
            TZ_LOCK: 0,
            NRO_SOLICITUD: dto.data.requestorId,
            COD_FUNCIONALIDAD: dto.data.funcionalityId
        });
        return createNotification.save();

    }
}