import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiDefaultResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto, ErrorDto } from '../error.dto';
import { ContractsService } from './contracts.service';
import { ContractDto } from './dto/contract.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  @ApiOkResponse({ type: [ContractDto] })
  @ApiUnauthorizedResponse({ type: UnauthorizedDto })
  @ApiDefaultResponse({ type: ErrorDto })
  findAll() {
    return this.contractsService.findAll();
  }
}
