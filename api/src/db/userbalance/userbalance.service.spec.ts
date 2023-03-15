import { Test, TestingModule } from "@nestjs/testing";
import { UserbalanceService } from "./userbalance.service";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../../test-utils/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Userbalance, UserbalanceSchema } from "../schemas/userbalance.schema";

const userBalanceObj = {
  wallet_address: "0x123",
  last_update: new Date().getTime(),
  token_symbol: "TestSymbol",
  amount: "123",
};

describe("UserbalanceService", () => {
  let service: UserbalanceService;

  beforeEach(async () => {
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

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
