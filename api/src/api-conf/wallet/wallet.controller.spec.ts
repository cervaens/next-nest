import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import {
  Userbalance,
  UserbalanceSchema,
} from "src/db/schemas/userbalance.schema";
import {
  Userhistory,
  UserhistorySchema,
} from "src/db/schemas/userhistory.schema";
import { UserbalanceService } from "src/db/userbalance/userbalance.service";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import { rootMongooseTestModule } from "src/test-utils/MongooseTestModule";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";

describe("WalletController", () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userbalance.name, schema: UserbalanceSchema },
          { name: Userhistory.name, schema: UserhistorySchema },
        ]),
      ],
      controllers: [WalletController],
      providers: [UserbalanceService, UserhistoryService, WalletService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
