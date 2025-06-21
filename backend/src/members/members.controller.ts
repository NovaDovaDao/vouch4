import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from "jsr:@danet/core";
import { MembersService } from "./members.service.ts";
import { CreateMemberDto, UpdateMemberDto } from "./member.model.ts";

@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: number) {
    return this.membersService.findOne(id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(Number(id), updateMemberDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.membersService.remove(Number(id));
  }

  @Post(":id/checkin")
  checkInMember(@Param("id") id: string) {
    return this.membersService.recordCheckIn(Number(id));
  }
}
