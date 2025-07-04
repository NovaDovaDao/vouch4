import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDto, UnauthorizedDto } from 'src/error.dto';
import { StaffDto } from './dto/staff.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffService } from './staff.service';

@UseGuards(AuthGuard('jwt'))
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  @ApiOkResponse({ type: [StaffDto] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll() {
    return this.staffService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: StaffDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findById(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: StaffDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: StaffDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @ApiCreatedResponse()
  @ApiDefaultResponse({ type: ErrorDto })
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
