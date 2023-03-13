import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DbService } from "./db.service";
import { UserbalanceService } from "./userbalance/userbalance.service";
import { Userbalance, UserbalanceSchema } from "./schemas/userbalance.schema";
import { MinttxService } from "./minttx/minttx.service";
import { Minttx, MinttxSchema } from "./schemas/minttx.schema";
import { UserhistoryService } from "./userhistory/userhistory.service";
import { Userhistory, UserhistorySchema } from "./schemas/userhistory.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Userhistory.name, schema: UserhistorySchema },
      { name: Userbalance.name, schema: UserbalanceSchema },
      { name: Minttx.name, schema: MinttxSchema },
    ]),
  ],
  providers: [
    DbService,
    UserhistoryService,
    UserbalanceService,
    MinttxService,
    UserhistoryService,
  ],
  exports: [DbService, UserhistoryService, UserbalanceService, MinttxService],
})
export class DbModule {}
