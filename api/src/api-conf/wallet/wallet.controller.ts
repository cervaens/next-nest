import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateUserbalanceDto } from "src/dto/create-userbalance.dto";
import { CreateUserhistoryDto } from "src/dto/create-userhistory.dto";
import { GetUserbalanceDto } from "src/dto/get-userbalance.dto";
import { GetUserHistoryDto } from "src/dto/get-userhistory.dto";
import { WalletService } from "./wallet.service";

@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Put("/connected/save")
  async addNewConnection(
    @Body() createUserHistory: CreateUserhistoryDto
  ): Promise<string> {
    try {
      await this.walletService.addNewRecord(createUserHistory);
      return `Connected wallet record inserted.`;
    } catch (err) {
      throw new HttpException(
        `Error when inserting login: ${err}`,
        HttpStatus.CONFLICT
      );
    }
  }

  @Get("/history/")
  async getWalletHistory(
    @Query() getUserHistoryDto: GetUserHistoryDto
  ): Promise<string> {
    try {
      const history = await this.walletService.getHistory(getUserHistoryDto);
      return history;
    } catch (err) {
      throw new HttpException(
        `Error when getting history: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get("/balance/")
  async getBalance(
    @Query() getUserbalanceDto: GetUserbalanceDto
  ): Promise<string> {
    try {
      const balance = await this.walletService.getBalance(getUserbalanceDto);
      return balance ? balance : 0;
    } catch (err) {
      throw new HttpException(
        `Error when getting balance: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/balance/update")
  async updateBalance(
    @Body() createUserbalance: CreateUserbalanceDto
  ): Promise<string> {
    try {
      await this.walletService.updateBalance(createUserbalance);
      return `User balance inserted`;
    } catch (err) {
      throw new HttpException(
        `Error when inserting balance: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
