// history.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { History } from "../users/schemas/history.schema";

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>
  ) {}

  async createHistory(
    userId: string,
    operation: string,
    details: string
  ): Promise<History> {
    const createdHistory = new this.historyModel({
      userId,
      operation,
      details,
    });
    return createdHistory.save();
  }

  async getHistory() {
    return this.historyModel.find({});
  }
}
