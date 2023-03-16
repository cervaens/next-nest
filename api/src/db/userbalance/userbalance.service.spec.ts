import { Test, TestingModule } from "@nestjs/testing";
import { UserbalanceService } from "./userbalance.service";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../../test-utils/MongooseTestModule";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Userbalance, UserbalanceSchema } from "../schemas/userbalance.schema";
import { userBalanceObj } from "../../test-utils/userbalance";
import { Connection } from "mongoose";

describe("UserbalanceService", () => {
  let service: UserbalanceService;
  let connection: Connection;

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
    connection = await module.get(getConnectionToken());
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
    await connection.close();
    await closeInMongodConnection();
  });
});
