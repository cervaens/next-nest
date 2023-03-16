import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Connection } from "mongoose";
import {
  Userhistory,
  UserhistorySchema,
} from "src/db/schemas/userhistory.schema";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "src/test-utils/MongooseTestModule";
import { MintService } from "./mint.service";

describe("MintService", () => {
  let service: MintService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userhistory.name, schema: UserhistorySchema },
        ]),
      ],
      providers: [UserhistoryService, MintService],
    }).compile();

    service = module.get<MintService>(MintService);
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
