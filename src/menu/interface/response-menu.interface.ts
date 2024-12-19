import { menu } from '@prisma/client';

export interface MenuQueryInterface extends menu {
  level: number;
}

export interface ResponseMenuInterface {
  id: string;
  key: string;
  label: string;
  children: ResponseMenuInterface[];
}
