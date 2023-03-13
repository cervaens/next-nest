import { Module } from "@nestjs/common";
import { DbModule } from "src/db/db.module";

import { WalletController } from "./wallet/wallet.controller";
import { WalletService } from "./wallet/wallet.service";
import { MintController } from './mint/mint.controller';
import { MintService } from './mint/mint.service';

@Module({
  imports: [DbModule],
  controllers: [WalletController, MintController],
  providers: [WalletService, MintService],
})
export class ApiConfModule {}
