import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { UserMintDto } from "src/dto/user-mint.dto";
import { MintService } from "./mint.service";

@Controller("mint")
export class MintController {
  constructor(private readonly mintService: MintService) {}
  @Put("/save")
  async addNewRecord(@Body() userMintDto: UserMintDto): Promise<string> {
    try {
      await this.mintService.addNewRecord(userMintDto);
      return `Mint record inserted.`;
    } catch (err) {
      throw new HttpException(
        `Error when inserting mint tx: ${err}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
