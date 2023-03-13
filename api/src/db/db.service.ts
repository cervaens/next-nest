import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class DbService {
  private minTimestamp: number;
  private maxTimestamp: number;
  private readonly logger = new Logger(DbService.name);

  constructor() {}
}
