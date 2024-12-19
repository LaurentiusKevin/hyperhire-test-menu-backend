import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [PrismaModule],
  providers: [MenuService, PrismaService],
  controllers: [MenuController],
})
export class MenuModule {}
