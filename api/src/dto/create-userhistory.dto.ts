import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

type ExtraInfo = {
  to: string;
  amount: string;
};
export class CreateUserhistoryDto {
  @ApiProperty({
    type: String,
    description: "Wallet address",
  })
  @IsNotEmpty()
  wallet_address: string;

  @ApiProperty({
    type: Number,
    description: "Timestamp",
  })
  @IsNotEmpty()
  timestamp: number;

  @ApiProperty({
    type: String,
    description: "History event",
  })
  @IsNotEmpty()
  event: string;

  @ApiProperty({
    type: Object,
    description: "Extra Info",
  })
  extraInfo?: ExtraInfo;
}
