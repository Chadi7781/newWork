// history.controller.ts
import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { HistoryService } from "src/history-service/history.service";

@Controller("history")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get("")
  async getHistory() {
    try {
      const history = await this.historyService.getHistory();
      return { history };
    } catch (error) {
      return { success: false, error: "Failed to retrieve history" };
    }
  }

  @Post()
  async createHistory(@Body() body: any) {
    const { userId, operation, details } = body;

    if (!userId || !operation || !details) {
      return { success: false, error: "Invalid request payload" };
    }

    try {
      const createdHistory = await this.historyService.createHistory(
        userId,
        operation,
        details
      );
      return { success: true, data: createdHistory };
    } catch (error) {
      return { success: false, error: "Failed to create history entry" };
    }
  }
}
