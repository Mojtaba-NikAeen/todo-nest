import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todoService.create(createTodoDto, req.user._id);
  }

  @Get()
  findAll(@Req() req) {
    return this.todoService.findAll(req.user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.todoService.findOne(id, req.user._id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    return this.todoService.update(id, updateTodoDto, req.user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.todoService.remove(id, req.user._id);
  }
}
