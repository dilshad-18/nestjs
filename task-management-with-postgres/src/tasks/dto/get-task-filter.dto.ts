import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.status';
export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}