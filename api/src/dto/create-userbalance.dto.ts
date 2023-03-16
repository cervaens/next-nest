import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
export class CreateUserbalanceDto {
  @ApiProperty({
    type: String,
    description: "Wallet address",
  })
  @IsNotEmpty()
  wallet_address: string;

  last_update: number;

  @ApiProperty({
    type: String,
    description: "Token symbol",
  })
  @IsNotEmpty()
  token_symbol: string;

  @ApiProperty({
    type: String,
    description: "Amount",
  })
  @IsNotEmpty()
  amount: string;
}
