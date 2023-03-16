import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
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
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "src/test-utils/MongooseTestModule";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { userBalanceObj } from "../../test-utils/userbalance";
import { Connection } from "mongoose";

describe("WalletController", () => {
  let controller: WalletController;
  let connection: Connection;

  beforeAll(async () => {
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
    connection = await module.get(getConnectionToken());
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Updating a user's balance from the controller", async () => {
    const update = await controller.updateBalance(userBalanceObj);
    expect(update).toBe("User balance inserted");
  });

  it("Get a user balance from the controller", async () => {
    const userBalanceRes = await controller.getBalance({
      wallet_address: userBalanceObj.wallet_address,
      token_symbol: userBalanceObj.token_symbol,
    });
    expect(userBalanceRes.amount).toBe(userBalanceObj.amount);
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });
});
