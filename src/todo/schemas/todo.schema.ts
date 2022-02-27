import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ required: true })
  text: string;

  @Prop({ default: 'NOT_DONE' })
  status: TodoStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  owner: User;
}

export enum TodoStatus {
  NOT_DONE = 'NOT_DONE',
  DONE = 'DONE',
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
