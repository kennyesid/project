import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type PglCreditoSmsDocument = HydratedDocument<PglCreditoSms>;

@Schema({ collection: 'PGL_CREDITOS_SMS', versionKey: false })
export class PglCreditoSms {
    @Prop({index:true})
    COD_MICROBATALLA: number;
    @Prop()
    MES: number;
    @Prop()
    CREDITO: number;
    @Prop()
    ESTADO: string
    @Prop()
    MONTO_RECARGA: number;
    @Prop()
    FECHA_RECARGA: Date;
    @Prop()
    HORA_RECARGA: string;
    @Prop()
    COD_AUTORIZADOR: string;
    @Prop()
    DESCRIPCION: string;
    @Prop()
    COD_USUARIO: string;
    @Prop()
    GESTION: string;
}
export const PglCreditoSmsSchema = SchemaFactory.createForClass(PglCreditoSms);