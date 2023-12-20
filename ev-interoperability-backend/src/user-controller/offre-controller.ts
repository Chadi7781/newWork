import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Req,
} from "@nestjs/common";
import { OffreService } from "src/user-service/offre-service.service";
import { UserService } from "src/user-service/user-service.service";
import { Offre } from "src/users/schemas/offre.schema";
import { User } from "src/users/schemas/users.schema";

@Controller("offres")
export class OffreController {
  constructor(
    private readonly offreService: OffreService,
    private readonly userServ: UserService
  ) {}
  @Post("createOffre/:username")
  async createOffre(
    @Param("username") username: string,
    @Body() offreData: Partial<Offre>
  ): Promise<Offre> {
    // Assuming you have logic to fetch the user by ID, for example:

    return this.offreService.createOffre(username, offreData);
  }

  @Get()
  getAllOffres(): Promise<Offre[]> {
    return this.offreService.getAllOffres();
  }

  @Get(":id")
  getOffreById(@Param("id") id: string): Promise<Offre> {
    return this.offreService.getOffreById(id);
  }

  @Get("user/:userId/count")
  countUserOffres(@Param("userId") userId: string): Promise<number> {
    return this.offreService.countUserOffres(userId);
  }

  @Put(":id")
  updateOffre(
    @Param("id") id: string,
    @Body() offreData: Partial<Offre>
  ): Promise<Offre> {
    return this.offreService.updateOffre(id, offreData);
  }

  @Delete(":id")
  deleteOffre(@Param("id") id: string): Promise<void> {
    return this.offreService.deleteOffre(id);
  }

  @Get("offreByUser/:userId") // Replace with the appropriate route path
  async getOffresByUser(@Param("userId") userId: string) {
    try {
      const userOffers = await this.offreService.getOffresByUser(userId);
      return { userOffers };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
