import { InjectModel } from "@nestjs/mongoose"
import { PglMicrobatallaSms } from "../schemas/pgl_microbatalla_sms.schema"
import { Model } from "mongoose"
import { Injectable } from "@nestjs/common";

@Injectable()
export class PglMicrobatallaRepository {

    constructor(@InjectModel(PglMicrobatallaSms.name) private microbatallaSmsModel: Model<PglMicrobatallaSms>) {
    }

    async findOne(cod_microbatalla: number): Promise<PglMicrobatallaSms> {
        const microbatallaSms = this.microbatallaSmsModel.findOne({ COD_MICROBATALLA: cod_microbatalla }).exec();
        return microbatallaSms;
    }
}