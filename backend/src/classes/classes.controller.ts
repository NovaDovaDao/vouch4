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
import { ClassesService } from './classes.service';
import { ClassDto } from './dto/class.dto';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiDefaultResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto, ErrorDto } from '../error.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOkResponse({ type: [ClassDto] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClassDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findById(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: ClassDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: ClassDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiCreatedResponse()
  @ApiDefaultResponse({ type: ErrorDto })
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }
}
