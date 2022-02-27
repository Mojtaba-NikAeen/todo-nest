import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    const createdTodo = new this.todoModel({ ...createTodoDto, owner: userId });

    return createdTodo.save();
  }

  findAll(userId: string) {
    return this.todoModel.find({ owner: userId }).select('status text');
  }

  async findOne(id: string, userId: string) {
    const res = await this.todoModel
      .findOne({ _id: id, owner: userId })
      .select('status text');

    if (!res) {
      throw new NotFoundException(`todo with id #${id} was not found`);
    }

    return res;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string) {
    const res = await this.todoModel.findOneAndUpdate(
      { _id: id, owner: userId },
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

  async remove(id: string, userId: string) {
    const res = await this.todoModel.deleteOne({ _id: id, owner: userId });

    if (res.deletedCount === 0) {
      throw new NotFoundException(`todo with id #${id} was not found`);
    }
  }
}
