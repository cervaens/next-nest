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
import { MintController } from "./mint.controller";
import { MintService } from "./mint.service";

describe("MintController", () => {
  let controller: MintController;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Userhistory.name, schema: UserhistorySchema },
        ]),
      ],
      controllers: [MintController],
      providers: [UserhistoryService, MintService],
    }).compile();

    controller = module.get<MintController>(MintController);
    connection = await module.get(getConnectionToken());
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });
});
