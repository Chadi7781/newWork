import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./users/users.module";
import { AccordModule } from "./users/schemas/accord.module";
import { HistoryModule } from "./users/schemas/history.module";
import { MulterModule } from "@nestjs/platform-express/multer";
import { MulterConfigModule } from "./utils/multer.config";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { OffreModule } from "./users/schemas/offre.module";

@Module({
  imports: [
    UserModule,
    AccordModule,
    HistoryModule,
    OffreModule,
    MulterConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),

    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: "mongodb://127.0.0.1:27017/electricdb",
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    this.connectToDatabase();
  }

  async connectToDatabase() {
    try {
      await MongooseModule.forRootAsync({
        useFactory: async () => ({
          uri: "mongodb://127.0.0.1:27017/electricdb",
        }),
      });
      console.log("Connected to the database");
    } catch (error) {
      console.error("Failed to connect to the database:", error.message());
    }
  }
}
