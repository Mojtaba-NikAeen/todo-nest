import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../schemas/todo.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
