import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TodoStatus } from '../schemas/todo.schema';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;
}
