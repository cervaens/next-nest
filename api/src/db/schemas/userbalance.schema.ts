import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserbalanceDocument = HydratedDocument<Userbalance>;

@Schema()
export class Userbalance {
  @Prop()
  wallet_address: string;

  @Prop()
  last_update: number;

  @Prop()
  token_symbol: string;

  @Prop()
  amount: string;
}

export const UserbalanceSchema = SchemaFactory.createForClass(Userbalance);
UserbalanceSchema.index(
  { wallet_address: 1, token_symbol: 1 },
  { unique: true }
);
