import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { GymsService } from './gyms.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GymEntity } from './entities/gym.entity';
import { ErrorDto, UnauthorizedDto } from '../error.dto';
import { JwtPayload } from '../auth/auth-jwt.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @ApiCreatedResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(@Body() createGymDto: CreateGymDto, @CurrentUser() user: JwtPayload) {
    if (!user.hasTenancy) {
      throw new BadRequestException();
    }
    return this.gymsService.create(user, createGymDto);
  }

  @Get()
  @ApiOkResponse({ type: [GymEntity] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll(@CurrentUser() user: JwtPayload) {
    if (!user.hasTenancy) return [];
    return this.gymsService.findAll(user);
  }

  @Get(':id')
  @ApiOkResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.gymsService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(
    @Param('id') id: string,
    @Body() updateGymDto: UpdateGymDto,

    @CurrentUser() user: JwtPayload,
  ) {
    return this.gymsService.update(user, id, updateGymDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.gymsService.remove(user, id);
  }
}
