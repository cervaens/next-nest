import { Test, TestingModule } from "@nestjs/testing";
import { DbModule } from "src/db/db.module";
import { UserbalanceService } from "src/db/userbalance/userbalance.service";
import { rootMongooseTestModule } from "src/test-utils/MongooseTestModule";
import { WalletService } from "./wallet.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Userbalance,
  UserbalanceSchema,
} from "src/db/schemas/userbalance.schema";
import { Minttx, MinttxSchema } from "src/db/schemas/minttx.schema";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import {
  Userhistory,
  UserhistorySchema,
} from "src/db/schemas/userhistory.schema";

describe("WalletService", () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userbalance.name, schema: UserbalanceSchema },
          { name: Userhistory.name, schema: UserhistorySchema },
          { name: Minttx.name, schema: MinttxSchema },
        ]),
      ],
      providers: [UserhistoryService, UserbalanceService, WalletService],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
