import { InjectModel } from "@nestjs/mongoose";
import { PglCreditoSms } from "../schemas/pgl_credito_sms.schema";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PglCreditoSmsRepository {
    constructor(@InjectModel(PglCreditoSms.name) private creditoSmsModel: Model<PglCreditoSms>) { }

    async findOne(codMicrobatalla: number, estado: string, month: number, management: string): Promise<PglCreditoSms> {
        const microbatalla = this.creditoSmsModel.findOne({ COD_MICROBATALLA: codMicrobatalla, ESTADO: estado, MES: month, GESTION: management }).exec();
        return microbatalla;
    }
    async decrementCredito(creditoSms: any): Promise<PglCreditoSms> {
        const filter = { _id: creditoSms._id };
        const update = { $inc: { CREDITO: -1 } };
        const creditoSmsResult = this.creditoSmsModel.findByIdAndUpdate(filter, update);
        return creditoSmsResult;
    }

    async UpdateEstado(creditoSms: any): Promise<PglCreditoSms> {
        const filter = { _id: creditoSms._id };
        const update = { ESTADO: creditoSms.ESTADO };
        const creditoActivo = this.creditoSmsModel.findOneAndUpdate(filter, update);
        return creditoActivo;
    }
}