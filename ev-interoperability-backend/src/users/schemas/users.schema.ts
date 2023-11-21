import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;

  @Prop()
  email: string;
  @Prop()
  token: string; // Add the token field

  @Prop()
  role: string; // Add the role field with enum values

  @Prop()
  activationToken: string; // Add activationToken field
  @Prop()
  isValid: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
