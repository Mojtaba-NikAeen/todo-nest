import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto) {
    const createdTodo = new this.todoModel(createTodoDto);

    return createdTodo.save();
  }

  findAll() {
    return this.todoModel.find();
  }

  async findOne(id: string) {
    const res = await this.todoModel.findById(id);

    if (!res) {
      throw new NotFoundException(`todo with id #${id} was not found`);
    }

    return res;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const res = await this.todoModel.findOneAndUpdate(
      { _id: id },
      updateTodoDto,
      {
        new: true,
      },
    );

    if (!res) {
      throw new NotFoundException(`todo with id #${id} was not found`);
    }
    return res;
  }

  async remove(id: string) {
    const res = await this.todoModel.deleteOne({ _id: id });

    if (res.deletedCount === 0) {
      throw new NotFoundException(`todo with id #${id} was not found`);
    }
  }
}
