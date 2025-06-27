import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Makes ConfigService available everywhere
    }),
  ],
})
export class ConfigAppModule {} // Renamed to avoid conflict with Nest's ConfigModule
