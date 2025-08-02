import { Controller, Get, Post, Body } from '@nestjs/common';
import { TenancyService } from './tenancy.service';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto, ErrorDto } from '../error.dto';
import { TenancyEntity } from './entities/tenancy.entity';
import { JwtPayload } from '../auth/auth-jwt.interface';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {}

  @Post()
  @ApiCreatedResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  create(
    @Body() createTenancyDto: CreateTenancyDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tenancyService.create(user, createTenancyDto);
  }

  @ApiOkResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  update(
    @Body() updateTenancyDto: UpdateTenancyDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.tenancyService.update(user, updateTenancyDto);
  }

  @Get()
  @ApiOkResponse({ type: TenancyEntity })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findOne(@CurrentUser() user: JwtPayload) {
    return this.tenancyService.findOne(user);
  }
}
