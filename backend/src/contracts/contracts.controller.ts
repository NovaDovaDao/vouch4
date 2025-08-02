import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiDefaultResponse,
} from '@nestjs/swagger';
import { UnauthorizedDto, ErrorDto } from '../error.dto';
import { ContractsService } from './contracts.service';
import { ContractDto } from './dto/contract.dto';

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
