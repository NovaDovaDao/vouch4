import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { ConfigAppModule } from './config/config.module';
import { StaffModule } from './staff/staff.module';
import { ClassesModule } from './classes/classes.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    ConfigAppModule,
    AuthModule,
    MembersModule,
    PrismaModule,
    MailModule,
    StaffModule,
    ClassesModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
