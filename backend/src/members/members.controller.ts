import { Controller, Get, Post, Param, Body } from "jsr:@danet/core";
import { MembersService } from "./members.service.ts";

@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.membersService.findById(id);
  }

  @Post(":id/checkin")
  checkIn(@Param("id") id: string) {
    return this.membersService.checkIn(id);
  }

  @Post(":id/waiver")
  updateWaiverStatus(
    @Param("id") id: string,
    @Body() body: { status: string }
  ) {
    return this.membersService.updateWaiverStatus(id, body.status);
  }

  @Post()
  create(@Body() body: any) {
    return this.membersService.createMember(body);
  }
}
