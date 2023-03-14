import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DbService } from "./db.service";
import { UserbalanceService } from "./userbalance/userbalance.service";
import { Userbalance, UserbalanceSchema } from "./schemas/userbalance.schema";
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
    UserhistoryService,
  ],
  exports: [DbService, UserhistoryService, UserbalanceService],
})
export class DbModule {}
