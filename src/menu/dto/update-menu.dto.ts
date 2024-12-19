import { IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  id: string;

  @IsString()
  parent_id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
