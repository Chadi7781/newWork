// history.model.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class History extends Document {
  @Prop()
  userId: string;

  @Prop()
  operation: string;

  @Prop()
  details: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
