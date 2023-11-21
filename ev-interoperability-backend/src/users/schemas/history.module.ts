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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "History", schema: HistorySchema }]),

    JwtModule.register({
      secret: "abceeee", // Provide your secret key
      signOptions: { expiresIn: "1h" }, // Adjust as needed
    }),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
