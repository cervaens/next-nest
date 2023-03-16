import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserMintDto {
  @ApiProperty({
    type: String,
    description: "Wallet address generating the Mint",
  })
  @IsNotEmpty()
  wallet_address: string;

  @ApiProperty({
    type: String,
    description: "Amount",
  })
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    type: String,
    description: "Mint To Address",
  })
  @IsNotEmpty()
  to: string;
}
