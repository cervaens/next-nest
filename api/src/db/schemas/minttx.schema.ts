import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MinttxDocument = HydratedDocument<Minttx>;

@Schema()
export class Minttx {
  @Prop()
  wallet_address: string;

  @Prop()
  timestamp: number;

  @Prop()
  amount: string;

  @Prop()
  to: string;

  @Prop()
  from: string;

  @Prop()
  txHash: string;

  @Prop()
  logType: string;
}

export const MinttxSchema = SchemaFactory.createForClass(Minttx);
MinttxSchema.index({ txHash: 1, logType: 1 }, { unique: true });
