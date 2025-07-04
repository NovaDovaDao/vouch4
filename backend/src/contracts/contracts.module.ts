import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { AuthModule } from '../auth/auth.module';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [AuthModule],
  providers: [ContractsService],
  controllers: [ContractsController],
})
export class ContractsModule {}
