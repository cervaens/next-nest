import { Injectable } from "@nestjs/common";
import { UserbalanceService } from "src/db/userbalance/userbalance.service";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import { CreateUserbalanceDto } from "src/dto/create-userbalance.dto";
import { CreateUserhistoryDto } from "src/dto/create-userhistory.dto";
import { GetUserbalanceDto } from "src/dto/get-userbalance.dto";
import { WalletAddressDto } from "src/dto/wallet-address.dto";

@Injectable()
export class WalletService {
  constructor(
    private readonly userhistoryService: UserhistoryService,
    private readonly userbalanceService: UserbalanceService
  ) {}

  async addNewRecord(walletAddressDto: WalletAddressDto) {
    const createUserHistory: CreateUserhistoryDto = {
      wallet_address: walletAddressDto.wallet_address.toLowerCase(),
      event: "Login",
      timestamp: new Date().getTime(),
    };

    return this.userhistoryService.create(createUserHistory);
  }

  async updateBalance(createUserbalance: CreateUserbalanceDto) {
    createUserbalance.wallet_address =
      createUserbalance.wallet_address.toLowerCase();
    createUserbalance.last_update = new Date().getTime();
    return this.userbalanceService.update(createUserbalance);
  }

  async getBalance(
    getUserbalanceDto: GetUserbalanceDto
  ): Promise<CreateUserbalanceDto> {
    getUserbalanceDto.wallet_address =
      getUserbalanceDto.wallet_address.toLowerCase();
    return this.userbalanceService.get(getUserbalanceDto);
  }

  async getHistory(walletAddressDto: WalletAddressDto) {
    walletAddressDto.wallet_address =
      walletAddressDto.wallet_address.toLowerCase();
    return this.userhistoryService.get(walletAddressDto);
  }
}
