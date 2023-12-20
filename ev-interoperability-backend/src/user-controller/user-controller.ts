import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
  Put,
  Res,
} from "@nestjs/common";
import { Response } from "express";

import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "src/user-service/user-service.service";
import { Multer } from "multer"; // Import Multer from 'multer' package
import { multerConfig } from "src/utils/multer.config";
import { File } from "buffer";
import { Observable } from "rxjs";
import { User } from "src/users/schemas/users.schema";

@Controller("auth")
export class UserAuthController {
  constructor(private readonly authService: UserService) {}

  @Post("register")
  async registerUser(
    @Body("username") username: string,
    @Body("password") password: string,
    @Body("email") email: string,
    @Body("role") role: string
  ): Promise<{ message: string }> {
    return this.authService.registerUser(username, password, email, role);
  }

  @Post("login")
  async loginUser(
    @Body("username") username: string,
    @Body("password") password: string
  ) {
    return this.authService.loginUser(username, password);
  }

  @Get("users")
  async getUsers(): Promise<any> {
    return this.authService.getUsers();
  }

  @Get("activate/:token")
  async getUserByToken(@Param("token") token: string) {
    try {
      const user = await this.authService.getUserByToken(token);

      return { user: user };
    } catch (error) {
      return error;
    }
  }

  @Post("activateAccount/:token")
  async activateAccount(
    @Param("token") token: string,
    @Body("password") password: string
  ) {
    return this.authService.activateAccount(token, password);
  }

  @Get("count-cpo")
  async countCpo(): Promise<{ cpoUsers: number }> {
    const cpoCount = await this.authService.countCpo();

    return {
      cpoUsers: cpoCount,
    };
  }
  @Get("count-emsp")
  async countEmsp(): Promise<{ emspUsers: number }> {
    const emspCount = await this.authService.countEmsp();

    return {
      emspUsers: emspCount,
    };
  }

  @Put(":id/update-profile-info")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async updateProfileInfo(
    @Param("id") userId: string,
    @Body() updateData: any,
    @UploadedFile() file: File
  ): Promise<any> {
    return this.authService.updateProfileInfo(userId, updateData, file);
  }

  @Get(":id")
  async getUserById(@Param("id") userId: string) {
    const user = await this.authService.getUserById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  @Get("picture/:filename")
  async servePicture(
    @Param("filename") filename: string,
    @Res() res: Response
  ): Promise<any> {
    const picture = await this.authService.findOnePicture(filename);

    if (!picture) {
      // Handle not found
      return res.status(404).end();
    }

    // Replace 'path/to/your/pictures' with the actual path to your picture folder
    const path = `../../uploads/${filename}`;
    res.sendFile(path);
  }

  @Post("forgot-password")
  async forgotPassword(@Body("email") email: string) {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @Post("reset-password/:token")
  async resetPassword(
    @Param("token") token: string,
    @Body("newPassword") newPassword: string
  ) {
    const result = await this.authService.resetPassword(token, newPassword);
    return result;
  }

  @Get(":id")
  async getUserDetail(@Param("id") id: string): Promise<User | null> {
    return this.authService.getUserByDetail(id);
  }
}
