import { Test, TestingModule } from "@nestjs/testing";
import { UserbalanceService } from "./userbalance.service";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../../test-utils/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Userbalance, UserbalanceSchema } from "../schemas/userbalance.schema";
import { userBalanceObj } from "../../test-utils/userbalance";

describe("UserbalanceService", () => {
  let service: UserbalanceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userbalance.name, schema: UserbalanceSchema },
        ]),
      ],
      providers: [UserbalanceService],
    }).compile();

    service = module.get<UserbalanceService>(UserbalanceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("User balance should be updated ", async () => {
    const update = await service.update(userBalanceObj);
    expect(update.upsertedCount).toBe(1);
  });

  it("User balance should be retrieved", async () => {
    const userBalanceRes = await service.get({
      wallet_address: userBalanceObj.wallet_address,
      token_symbol: userBalanceObj.token_symbol,
    });
    expect(userBalanceRes.amount).toBe(userBalanceObj.amount);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
