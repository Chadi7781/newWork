import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { HistoryService } from "src/history-service/history.service";
import { Accord } from "src/users/schemas/accord.schema";
import { User } from "src/users/schemas/users.schema";

@Injectable()
export class AccordService {
  constructor(
    @InjectModel(Accord.name) private accordModel: Model<Accord>,
    private historyService: HistoryService
  ) {}

  async sendAccord(user: User, userId: any): Promise<Accord> {
    try {
      const userData = {
        username: user.username,
        email: user.email,
        role: user.role,
      };
      const accord = await this.accordModel.create({
        user: userData,
        etat_accord: "pending",
        idUser: new Types.ObjectId(userId),
      });
      await this.historyService.createHistory(
        userId,
        "Confirm Accord between cpo adn emsp",
        `Accord status: ${accord.etat_accord}  \n
        ,Accord username: ${accord.user.username}`
      );

      return accord;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while sending an accord");
    }
  }

  async confirmAccord(accordId: string): Promise<Accord> {
    try {
      const accord = await this.accordModel.findByIdAndUpdate(
        accordId,
        { etat_accord: "confirmed" },
        { new: true }
      );

      if (!accord) {
        throw new NotFoundException("Accord not found");
      }

      return accord;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while confirming an accord");
    }
  }

  async refuseAccord(accordId: string): Promise<Accord> {
    try {
      const accord = await this.accordModel.findByIdAndUpdate(
        accordId,
        { etat_accord: "refused" },
        { new: true }
      );

      if (!accord) {
        throw new NotFoundException("Accord not found");
      }

      return accord;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while confirming an accord");
    }
  }

  async getAllAccords() {
    try {
      const accords = await this.accordModel.find({}).populate("user");
      return accords;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while retrieving accords");
    }
  }

  async getAccord(id: any): Promise<Accord[]> {
    try {
      const accords = await this.accordModel.find({});
      console.log(accords);

      return accords;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while retrieving accords");
    }
  }
}
