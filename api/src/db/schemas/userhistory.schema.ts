import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserhistoryDocument = HydratedDocument<Userhistory>;
@Schema()
class ExtraInfo {
  to: string;
  amount: string;
}

@Schema()
export class Userhistory {
  @Prop()
  wallet_address: string;

  @Prop()
  timestamp: number;

  @Prop()
  event: string;

  @Prop()
  extraInfo: ExtraInfo;
}

export const UserhistorySchema = SchemaFactory.createForClass(Userhistory);
UserhistorySchema.index(
  { wallet_address: 1, timestamp: 1, event: 1 },
  { unique: true }
);
UserhistorySchema.index({ timestamp: 1 });
