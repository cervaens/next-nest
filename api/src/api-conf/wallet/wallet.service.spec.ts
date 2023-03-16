import { Test, TestingModule } from "@nestjs/testing";
import { UserbalanceService } from "src/db/userbalance/userbalance.service";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "src/test-utils/MongooseTestModule";
import { WalletService } from "./wallet.service";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
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
import { Connection } from "mongoose";

describe("WalletService", () => {
  let service: WalletService;
  let connection: Connection;

  beforeAll(async () => {
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
    connection = await module.get(getConnectionToken());
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });
});
