import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
