import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/schemas/users.schema";
import { generateActivationToken } from "src/utils/token";
import { EmailService } from "src/email-service/email.service";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async registerUser(
    username: string,
    password: string,
    email: string,
    role: string
  ) {
    try {
      const existingUser = await this.userModel.findOne({
        username,
        email,
        role,
      });
      if (existingUser) {
        return { message: "User exist", success: "false" };
      }

      // Generate activation token
      const activationToken = generateActivationToken(username);

      // Create the user with the chosen role and activation token
      await this.userModel.create({
        username,
        password: "default",
        email,
        role,
        activationToken,
        isValid: false,
      });
      // Send an activation email
      await this.emailService.sendActivationEmail(
        email,
        activationToken,
        password
      );

      return { message: "User registered successfully" };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(
        "An error occurred while registering the user"
      );
    }
  }

  async loginUser(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({ username });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      console.log(password);
      console.log(user.password);
      if (!(password === user.password)) {
        throw new UnauthorizedException("Invalid login credentials");
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      const userLogin = {
        username: username,
        email: user.email,
        role: user.role,
        activationToken: token,
        isValid: user.isValid ? true : false,
        _id: user._id,
        password: password,
      };
      return userLogin;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException("An error occurred while logging in");
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({ isValid: true });
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`
      );
      throw new Error("An error occurred while retrieving users");
    }
  }
  async getUserByToken(activationToken: string) {
    try {
      const user = await this.userModel.findOne({ activationToken });

      if (!user) {
        return { message: "User not found", user };
      }

      return user;
    } catch (error) {
      return { message: error };
    }
  }

  async activateAccount(token: string, password: string) {
    try {
      const user = await this.userModel.findOne({ activationToken: token });

      if (!user) {
        return { message: "Invalid activation token", error: "INVALID_TOKEN" };
      }

      user.password = password;
      // Update user to mark account as activated
      user.isValid = true;
      user.activationToken = undefined; // Clear activation token after successful activation
      await user.save();

      return { message: "Account activated successfully", success: true };
    } catch (error) {
      console.error(error);
      return { message: "An Error occured ", error: "ERROR_OCCURED" };
    }
  }
}
