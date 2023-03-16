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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserbalanceDto } from "src/dto/create-userbalance.dto";
import { GetUserbalanceDto } from "src/dto/get-userbalance.dto";
import { WalletAddressDto } from "src/dto/wallet-address.dto";
import { WalletService } from "./wallet.service";

@ApiTags("Wallet")
@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({
    description: "Adds a new record when a wallet connects",
  })
  @Put("/connected/save")
  async addNewConnection(
    @Body() walletAddressDto: WalletAddressDto
  ): Promise<string> {
    try {
      await this.walletService.addNewRecord(walletAddressDto);
      return `Connected wallet record inserted.`;
    } catch (err) {
      throw new HttpException(
        `Error when inserting login: ${err}`,
        HttpStatus.CONFLICT
      );
    }
  }

  @ApiOperation({
    description: "Gets the behavioral history of a user",
  })
  @Get("/history/")
  async getWalletHistory(
    @Query() walletAddressDto: WalletAddressDto
  ): Promise<string> {
    try {
      const history = await this.walletService.getHistory(walletAddressDto);
      return history;
    } catch (err) {
      throw new HttpException(
        `Error when getting history: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiOperation({
    description: "Gets a user balance for a certain token",
  })
  @Get("/balance/")
  async getBalance(
    @Query() getUserbalanceDto: GetUserbalanceDto
  ): Promise<CreateUserbalanceDto> {
    try {
      return await this.walletService.getBalance(getUserbalanceDto);
    } catch (err) {
      throw new HttpException(
        `Error when getting balance: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiOperation({
    description: "Updates a user token balance",
  })
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
