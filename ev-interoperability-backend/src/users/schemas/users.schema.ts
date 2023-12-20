import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  token: string; // Add the token field for activation

  @Prop()
  role: string;

  @Prop()
  activationToken: string;

  @Prop()
  isValid: boolean;

  @Prop()
  file: string;

  @Prop()
  personToContact: string;

  @Prop()
  phone: string;

  @Prop()
  country: string;

  @Prop()
  address: string;

  @Prop()
  about: string;

  @Prop()
  resetPasswordToken: string; // Add reset password token field

  @Prop()
  resetPasswordExpires: Date; // Add reset password expiration field

  @Prop({ type: Types.ObjectId, ref: "Offre" })
  offres: Types.ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
