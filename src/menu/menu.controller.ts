import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { menu } from '@prisma/client';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ResponseMenuInterface } from './interface/response-menu.interface';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenus(): Promise<ResponseMenuInterface[]> {
    return this.menuService.menus();
  }

  @Post()
  async createMenu(@Body() params: CreateMenuDto): Promise<menu> {
    return this.menuService.createMenu(params);
  }

  @Put()
  async updateMenu(@Body() params: UpdateMenuDto): Promise<menu> {
    return this.menuService.updateMenu(params);
  }
}
