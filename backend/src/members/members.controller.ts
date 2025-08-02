import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MembersService } from './members.service';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDto, UnauthorizedDto } from '../error.dto';
import { MemberDto } from './dto/member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOkResponse({ type: [MemberDto] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MemberDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findById(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: MemberDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: MemberDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiCreatedResponse()
  @ApiDefaultResponse({ type: ErrorDto })
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }

  @Post(':id/checkin')
  @ApiCreatedResponse()
  @ApiDefaultResponse({ type: ErrorDto })
  checkInMember(@Param('id') id: string) {
    return this.membersService.recordCheckIn(id);
  }
}
