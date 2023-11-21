import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./users.schema";

@Schema({ timestamps: true })
export class Accord {
  @Prop({ type: User })
  user: User;

  @Prop()
  etat_accord: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  idUser: Types.ObjectId;

  
}

export type AccordDocument = Accord & Document;
export const AccordSchema = SchemaFactory.createForClass(Accord);
