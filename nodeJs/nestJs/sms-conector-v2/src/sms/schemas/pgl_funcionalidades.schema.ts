import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";



export type PglFuncionalidadesDocument = HydratedDocument<PglFuncionalidades>;

@Schema({ collection: 'PGL_FUNCIONALIDADES', versionKey: false })
export class PglFuncionalidades {
    @Prop()
    COD_MICROBATALLA: number;
    @Prop({index:true})
    COD_FUNCIONALIDAD: number;
    @Prop()
    NOMBRE: string;
    @Prop()
    ESTADO: string
    @Prop()
    FECHA_REGISTRO: Date;
    @Prop()
    HORA_REGISTRO: string;
    @Prop()
    COD_USUARIO: string;
    @Prop()
    PRIORIDAD: number;

}
export const PglFuncionalidadesSchema = SchemaFactory.createForClass(PglFuncionalidades);