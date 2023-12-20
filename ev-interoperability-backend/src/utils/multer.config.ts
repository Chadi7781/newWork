// multer.config.ts
import { MulterModule } from "@nestjs/platform-express";
import { Module } from "@nestjs/common";
import { diskStorage } from "multer";
import { join } from "path";

export const multerConfig = {
  storage: diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
};

export const storagePath = join(__dirname, "..", "uploads");

@Module({
  imports: [MulterModule.register(multerConfig)],
})
export class MulterConfigModule {}
