import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import {
  Userhistory,
  UserhistorySchema,
} from "src/db/schemas/userhistory.schema";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import { rootMongooseTestModule } from "src/test-utils/MongooseTestModule";
import { MintController } from "./mint.controller";
import { MintService } from "./mint.service";

describe("MintController", () => {
  let controller: MintController;

  beforeEach(async () => {
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
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
