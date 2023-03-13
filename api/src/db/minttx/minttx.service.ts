import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Minttx, MinttxDocument } from "../schemas/minttx.schema";

@Injectable()
export class MinttxService {
  constructor(
    @InjectModel(Minttx.name)
    private readonly minttxModel: Model<MinttxDocument>
  ) {}

  //   async create(createMinttx: CreateMinttxDto): Promise<any> {
  //     return this.minttxModel.create(createMinttx);
  //   }
}
