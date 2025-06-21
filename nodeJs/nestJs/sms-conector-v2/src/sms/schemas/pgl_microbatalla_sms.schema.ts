import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoose from "mongoose";

mongoose.set('debug', true);

export type PglMicrobatallaSmsDocument = HydratedDocument<PglMicrobatallaSms>;

@Schema({ collection: 'PGL_MICROBATALLA_SMS', versionKey: false })
export class PglMicrobatallaSms {
    @Prop()
    COD_MICROBATALLA: number;
    @Prop()
    NOMBRE: string;
    @Prop()
    CANTIDAD_MAXIMA: number;
    @Prop()
    ESTADO: string
    @Prop()
    FECHA_REGISTRO: Date;
    @Prop()
    COD_USUARIO: string;
    @Prop()
    ACCESO_USUARIO: string;
    @Prop()
    VALIDA_LIMITE_CREDITO: boolean
}
export const PglMicrobatallaSmsSchema = SchemaFactory.createForClass(PglMicrobatallaSms);