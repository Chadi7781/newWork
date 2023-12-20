import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt"; // Import JwtModule
import { UserService } from "src/user-service/user-service.service";
import { UserAuthController } from "src/user-controller/user-controller";
import { EmailService } from "src/email-service/email.service";
import { AccordController } from "src/accord-controller/accord.controller";
import { AccordService } from "src/accord-service/accord.service";
import { Accord, AccordSchema } from "./accord.schema";
import { HistoryController } from "src/history-controller/history.controller";
import { HistoryService } from "src/history-service/history.service";
import { History, HistorySchema } from "./history.schema";
import { OffreController } from "src/user-controller/offre-controller";
import { OffreService } from "src/user-service/offre-service.service";
import { OffreSchema } from "./offre.schema";
import { UserModule } from "../users.module";
import { User, UserSchema } from "./users.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Offre", schema: OffreSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      secret: "abceeee",
      signOptions: { expiresIn: "1h" },
    }),
  ],

  controllers: [OffreController],
  providers: [OffreService, UserService, EmailService],
  exports: [OffreService],
})
export class OffreModule {}
