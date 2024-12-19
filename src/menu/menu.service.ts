import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { menu } from '@prisma/client';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {
  MenuQueryInterface,
  ResponseMenuInterface,
} from './interface/response-menu.interface';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  buildMenuTree(
    parentId: string | null,
    items: MenuQueryInterface[],
  ): ResponseMenuInterface[] {
    return items
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        id: item.id,
        key: item.id,
        label: item.name,
        children: this.buildMenuTree(item.id, items),
      }));
  }

  async menus(): Promise<ResponseMenuInterface[]> {
    const results: MenuQueryInterface[] = await this.prisma.$queryRaw`
        WITH RECURSIVE menu_cte AS (
          SELECT
            id,
            parent_id,
            name,
            description,
            1 AS level
          FROM
            menu
          WHERE
            parent_id IS NULL
          UNION ALL
          SELECT
            m.id,
            m.parent_id,
            m.name,
            m.description,
            cte.level + 1 AS level
          FROM
            menu m
          INNER JOIN
            menu_cte cte ON m.parent_id = cte.id
        )
        SELECT
          *
        FROM
          menu_cte
        ORDER BY
          level, id;`;

    return this.buildMenuTree(null, results);
  }

  async createMenu(params: CreateMenuDto): Promise<menu> {
    return this.prisma.menu.create({
      data: {
        ...params,
      },
    });
  }

  async updateMenu(params: UpdateMenuDto): Promise<menu> {
    return this.prisma.menu.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    });
  }
}
