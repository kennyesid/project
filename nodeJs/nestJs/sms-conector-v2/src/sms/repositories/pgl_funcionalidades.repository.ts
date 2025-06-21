import { Injectable } from "@nestjs/common";
import { PglFuncionalidades } from "../schemas/pgl_funcionalidades.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PglFuncionalidadesRepository {
    constructor(@InjectModel(PglFuncionalidades.name) private functionalityModel: Model<PglFuncionalidades>) {

    }
    async findOne(funcionalityId: number): Promise<PglFuncionalidades> {
        const funcionality = this.functionalityModel.findOne({ COD_FUNCIONALIDAD: funcionalityId }).exec();
        return funcionality;
    }
}