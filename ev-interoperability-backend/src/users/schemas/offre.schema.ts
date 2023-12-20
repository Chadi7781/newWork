// src/offre/offre.model.ts

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Offre extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  characteristics: string; // Assuming characteristics is a string, you can adjust the type accordingly

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  offreLocation: string;

  @Prop({ required: true, enum: ["public", "private"] })
  offreType: string;

  // Add the reference to User schema
  @Prop({ type: Types.ObjectId, ref: "User" })
  user: Types.ObjectId;
}

export const OffreSchema = SchemaFactory.createForClass(Offre);
