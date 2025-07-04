import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClassesService } from './classes.service';
import { ClassDto } from './dto/class.dto';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiDefaultResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto, ErrorDto } from '../error.dto';

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
}
