import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SkipAuthGuard } from './auth/guards/skipauth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SkipAuthGuard()
  @ApiOperation({ summary: 'Check server health' })
  @ApiResponse({ status: 200 })
  getHello(): string {
    return this.appService.getHello();
  }
}
