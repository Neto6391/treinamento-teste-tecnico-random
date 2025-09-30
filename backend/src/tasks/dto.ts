import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import type { TaskStatus } from '../tasks/task.entity';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsIn(['todo', 'doing', 'done'])
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;


  @IsOptional()
  @IsIn(['todo', 'doing', 'done'])
  status?: TaskStatus;
}
