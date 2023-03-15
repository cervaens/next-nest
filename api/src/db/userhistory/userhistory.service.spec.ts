import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { rootMongooseTestModule } from "../../test-utils/MongooseTestModule";
import { Userhistory, UserhistorySchema } from "../schemas/userhistory.schema";
import { UserhistoryService } from "./userhistory.service";

describe("UserhistoryService", () => {
  let service: UserhistoryService;

  beforeEach(async () => {
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
});
