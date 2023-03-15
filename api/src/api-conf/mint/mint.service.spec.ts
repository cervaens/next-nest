import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import {
  Userhistory,
  UserhistorySchema,
} from "src/db/schemas/userhistory.schema";
import { UserhistoryService } from "src/db/userhistory/userhistory.service";
import { rootMongooseTestModule } from "src/test-utils/MongooseTestModule";
import { MintService } from "./mint.service";

describe("MintService", () => {
  let service: MintService;

  beforeEach(async () => {
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
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
