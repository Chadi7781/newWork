import { Controller, Post, Param, Get, Body } from "@nestjs/common";
import { AccordService } from "src/accord-service/accord.service";
import { User } from "src/users/schemas/users.schema";

@Controller("accords")
export class AccordController {
  constructor(private readonly accordService: AccordService) {}

  @Post("send/:userId")
  async sendAccord(
    @Body("user") user: User,
    @Param("userId")
    userId: any
  ) {
    const accord = await this.accordService.sendAccord(user, userId);
    return { message: "Accord sent successfully", accord };
  }

  @Post("confirm/:accordId")
  async confirmAccord(@Param("accordId") accordId: string) {
    const accord = await this.accordService.confirmAccord(accordId);
    return { message: "Accord confirmed successfully", accord };
  }

  @Post("refuse/:accordId")
  async refuseAccord(@Param("accordId") accordId: string) {
    const accord = await this.accordService.refuseAccord(accordId);
    return { message: "Accord refused successfully", accord };
  }

  @Get("all")
  async getAllAccords() {
    const accords = await this.accordService.getAllAccords();
    return { accords };
  }

  @Get("accord/:idUser")
  async getAccord(@Param("idUser") idUser: any) {
    console.log("hii");
    const accords = await this.accordService.getAccord(idUser);
    return { accords };
  }
}
