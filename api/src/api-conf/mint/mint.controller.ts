import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserMintDto } from "src/dto/user-mint.dto";
import { MintService } from "./mint.service";

@ApiTags("Mint")
@Controller("mint")
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @ApiOperation({
    description: "Adds a new token mint record",
  })
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
