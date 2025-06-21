import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PglNotificacionesSmsDocument = HydratedDocument<PglNotificacionesSms>;

@Schema({collection: 'PGL_NOTIFICACIONES_SMS', versionKey: false})
export class PglNotificacionesSms {

    @Prop()
    NRO_DESTINATARIO: string;
    @Prop()
    COD_TIPO_IDENTIFICACION: string;
    @Prop()
    PROVEEDOR_SMS: string;
    @Prop()
    FECHA_ENVIO: string;
    @Prop()        
    HORA_ENVIO: string;
    @Prop()
    SESION: string;
    @Prop()
    FECHA_CONFIRMACION: string;
    @Prop()
    HORA_CONFIRMACION: string;
    @Prop()
    MENSAJE: string;
    @Prop()
    MSGID: string;
    @Prop()
    MSGPARTS: string;
    @Prop()
    CUERPO_ENVIO: string;
    @Prop()
    CUERPO_CONFIRMACION: string;
    @Prop()
    COD_ESTADO: string;
    @Prop()
    COD_USUARIO: string;
    @Prop()
    COD_SUCURSAL: string;
    @Prop()
    COD_APLICACION: string;
    @Prop()
    TZ_LOCK: string;
    @Prop()
    NRO_SOLICITUD: string;
    @Prop()
    COD_FUNCIONALIDAD:number;

}

export const PglNotificacionesSmsSchema=SchemaFactory.createForClass(PglNotificacionesSms);