export class CreateUserhistoryDto {
  wallet_address: string;
  timestamp: number;
  event: string;
  extraInfo?: {
    to: string;
    amount: string;
  };
}
