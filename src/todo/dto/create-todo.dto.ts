import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../schemas/todo.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
