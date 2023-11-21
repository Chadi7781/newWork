import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { UserService } from "src/user-service/user-service.service";

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
}
