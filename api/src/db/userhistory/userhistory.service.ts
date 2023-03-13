import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserhistoryDto } from "src/dto/create-userhistory.dto";
import { GetUserHistoryDto } from "src/dto/get-userhistory.dto";
import {
  Userhistory,
  UserhistoryDocument,
} from "../schemas/userhistory.schema";

@Injectable()
export class UserhistoryService {
  constructor(
    @InjectModel(Userhistory.name)
    private readonly userhistoryModel: Model<UserhistoryDocument>
  ) {}

  async create(createUserhistory: CreateUserhistoryDto): Promise<any> {
    return this.userhistoryModel.create(createUserhistory);
  }

  async get(getUserHistoryDto: GetUserHistoryDto): Promise<any> {
    return this.userhistoryModel.find(getUserHistoryDto).lean();
  }
}
