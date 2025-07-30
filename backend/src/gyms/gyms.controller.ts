import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  BadRequestException,
  UseGuards,
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
import { UserJwtResponse } from '../auth/auth-jwt.interface';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('gyms')
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @ApiCreatedResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(
    @Body() createGymDto: CreateGymDto,
    @Request() req: { user: UserJwtResponse['user'] },
  ) {
    if (!req.user.tenancyId) {
      throw new BadRequestException();
    }
    return this.gymsService.create(req.user.tenancyId, createGymDto);
  }

  @Get()
  @ApiOkResponse({ type: [GymEntity] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll(@Request() req: { user: UserJwtResponse['user'] }) {
    if (!req.user.tenancyId) return [];
    return this.gymsService.findAll(req.user.tenancyId);
  }

  @Get(':id')
  @ApiOkResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findOne(@Param('id') id: string) {
    return this.gymsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GymEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(@Param('id') id: string, @Body() updateGymDto: UpdateGymDto) {
    return this.gymsService.update(id, updateGymDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  remove(@Param('id') id: string) {
    return this.gymsService.remove(id);
  }
}
