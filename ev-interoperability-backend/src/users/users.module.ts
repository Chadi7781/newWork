import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt"; // Import JwtModule
import { User, UserSchema } from "./schemas/users.schema";
import { UserService } from "src/user-service/user-service.service";
import { UserAuthController } from "src/user-controller/user-controller";
import { EmailService } from "src/email-service/email.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "abceeee", // Provide your secret key
      signOptions: { expiresIn: "1h" }, // Adjust as needed
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserService, EmailService],
})
export class UserModule {}
