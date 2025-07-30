import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Put,
  Param,
} from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedDto, ErrorDto } from '../error.dto';
import { TenancyEntity } from './entities/tenancy.entity';
import { UserJwtResponse } from '../auth/auth-jwt.interface';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {}

  @Post()
  @ApiCreatedResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(
    @Body() createTenancyDto: CreateTenancyDto,
    @Request() req: { user: UserJwtResponse['user'] },
  ) {
    return this.tenancyService.create(req.user, createTenancyDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(
    @Param('id') id: string,
    @Body() updateTenancyDto: UpdateTenancyDto,
    @Request() req: { user: UserJwtResponse['user'] },
  ) {
    if (req.user.tenancyId !== id) {
      throw new BadRequestException();
    }
    return this.tenancyService.update(id, updateTenancyDto);
  }

  @Get()
  @ApiOkResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findOne(@Request() req: { user: UserJwtResponse['user'] }) {
    return this.tenancyService.findOne(req.user.id);
  }
}
