import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class GetUserbalanceDto {
  @ApiProperty({
    type: String,
    description: "Wallet address",
  })
  @IsNotEmpty()
  wallet_address: string;

  @ApiProperty({
    type: String,
    description: "Token Symbol",
  })
  @IsNotEmpty()
  token_symbol: string;
}
