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
  private readonly uploadPath = "./uploads/";

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
        phone: "",
        country: "",
        address: "",
        about: "",
        picture: "",
        resetPasswordToken: "",
        resetPasswordExpires: null,
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
        phone: user.phone,
        address: user.address,
        country: user.country,
        file: user.file,
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

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
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

  async getCountByRole(role: string): Promise<number> {
    try {
      const count = await this.userModel.countDocuments({ role: role }).exec();
      return count;
    } catch (error) {
      // Handle errors appropriately (log or throw an exception)
      console.error(error);
      throw new Error("Error counting users by role");
    }
  }

  async countCpo(): Promise<any> {
    // Count CPO and EMSP users
    const cpoCount = await this.getCountByRole("cpo");

    return {
      cpoCount,
    };
  }
  async countEmsp(): Promise<any> {
    // Count CPO and EMSP use
    const emspCount = await this.getCountByRole("emsp");

    return {
      emspCount,
    };
  }
  async updateProfileInfo(userId, updateData, file): Promise<any> {
    try {
      const user = await this.userModel.findById(userId);

      if (user) {
        if (updateData.username) user.username = updateData.username;
        if (updateData.email) user.email = updateData.email;
        if (updateData.role) user.role = updateData.role;
        if (updateData.country) user.country = updateData.country;
        if (updateData.address) user.address = updateData.address;
        if (updateData.about) user.about = updateData.about;
        if (updateData.isValid !== undefined) user.isValid = updateData.isValid;
        if (updateData.personToContact)
          user.personToContact = updateData.personToContact;
        if (updateData.phone) user.phone = updateData.phone;

        if (file) {
          user.file = file.filename;
        }

        console.log("hi file", user.file);
        const updatedUser = await user.save();
        return updatedUser;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(`Error updating user profile: ${error.message}`);
    }
  }

  async findOnePicture(filename: string): Promise<any | null> {
    return this.userModel.findOne({ filename }).exec();
  }

  // ...

  async getUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(userId).exec();
      return user || null;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return { message: "User not found", error: "USER_NOT_FOUND" };
      }

      // Generate a unique token for password reset

      const resetToken = generateActivationToken(user.username); // Implement your own token generation logic

      console.log("reset token :", resetToken);
      console.log("the user ====>", user);
      // Save the token and expiration time to the user document
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

      await user.save();

      // Send an email to the user with a link containing the resetToken
      await this.emailService.sendResetPasswordEmail(email, resetToken);

      return {
        message: "Password reset email sent successfully",
        success: true,
      };
    } catch (error) {
      console.error(error);
      return { message: "An error occurred", error: "ERROR_OCCURRED" };
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      console.log("reset password token backend", token);
      const user = await this.userModel.findOne({
        resetPasswordToken: token,
      });
      console.log("user====>", user);

      if (!user) {
        return { message: "Invalid or expired token", error: "INVALID_TOKEN" };
      }

      console.log("user password", user.password);
      console.log("new password", newPassword);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return { message: "Password reset successfully", success: true };
    } catch (error) {
      console.error(error);
      return { message: "An error occurred", error: "ERROR_OCCURRED" };
    }
  }
  async getUserByDetail(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
