import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { rootMongooseTestModule } from "../../test-utils/MongooseTestModule";
import { Userhistory, UserhistorySchema } from "../schemas/userhistory.schema";
import { UserhistoryService } from "./userhistory.service";
import { userHistoryObj } from "../../test-utils/userhistory";

describe("UserhistoryService", () => {
  let service: UserhistoryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userhistory.name, schema: UserhistorySchema },
        ]),
      ],
      providers: [UserhistoryService],
    }).compile();

    service = module.get<UserhistoryService>(UserhistoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("User history should be updated ", async () => {
    const create = await service.create(userHistoryObj);
    expect(create).toBeDefined();
  });

  it("User balance should be retrieved", async () => {
    const userBalanceRes = await service.get({
      wallet_address: userHistoryObj.wallet_address,
    });
    expect(userBalanceRes[0].extraInfo.amount).toBe(
      userHistoryObj.extraInfo.amount
    );
  });
});
