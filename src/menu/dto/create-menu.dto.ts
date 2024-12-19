import { IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsOptional()
  parent_id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
