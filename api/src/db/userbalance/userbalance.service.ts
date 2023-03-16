import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserbalanceDto } from "src/dto/create-userbalance.dto";
import { GetUserbalanceDto } from "src/dto/get-userbalance.dto";
import {
  Userbalance,
  UserbalanceDocument,
} from "../schemas/userbalance.schema";

@Injectable()
export class UserbalanceService {
  constructor(
    @InjectModel(Userbalance.name)
    private readonly userbalanceModel: Model<UserbalanceDocument>
  ) {}

  async update(createUserbalance: CreateUserbalanceDto): Promise<any> {
    return this.userbalanceModel.updateOne(
      {
        wallet_address: createUserbalance.wallet_address,
        token_symbol: createUserbalance.token_symbol,
      },
      createUserbalance,
      { upsert: true }
    );
  }

  async get(
    getUserbalanceDto: GetUserbalanceDto
  ): Promise<CreateUserbalanceDto> {
    return this.userbalanceModel.findOne(getUserbalanceDto).lean();
  }
}
