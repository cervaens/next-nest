import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class WalletAddressDto {
  @ApiProperty({
    type: String,
    description: "Wallet address",
  })
  @IsNotEmpty()
  wallet_address: string;
}
