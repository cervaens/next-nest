import { Injectable } from "@nestjs/common";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import { CreateUserhistoryDto } from "src/dto/create-userhistory.dto";
import { UserMintDto } from "src/dto/user-mint.dto";

@Injectable()
export class MintService {
  constructor(private readonly userHistoryService: UserhistoryService) {}

  async addNewRecord(userMintDto: UserMintDto) {
    userMintDto.wallet_address = userMintDto.wallet_address.toLowerCase();
    const newRecord = {
      wallet_address: userMintDto.wallet_address,
      timestamp: new Date().getTime(),
      event: "Mint",
      extraInfo: {
        to: userMintDto.to,
        amount: userMintDto.amount,
      },
    };
    return this.userHistoryService.create(newRecord);
  }
}