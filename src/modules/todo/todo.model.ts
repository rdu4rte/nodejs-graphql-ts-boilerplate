import { getModelForClass } from '@typegoose/typegoose'
import { Todo } from '../../entities'
import { ObjectId } from 'mongodb'
import { TodoDto } from './todo.dto'
import { Service } from 'typedi'

// mongoose model
export const TodoMongooseModel = getModelForClass(Todo)

@Service()
export default class TodoModel {
  async getById(_id: ObjectId): Promise<Todo | null> {
    // default mongoose use
    return await TodoMongooseModel.findById(_id).lean().exec()
  }

  async create(data: TodoDto): Promise<Todo> {
    const todo = new TodoMongooseModel(data)
    await todo.save()
    return todo
  }

  async find(): Promise<Todo[]> {
    return await TodoMongooseModel.find()
  }

  async update(id: ObjectId, data: TodoDto): Promise<Todo | null> {
    return await TodoMongooseModel.findByIdAndUpdate(id, data)
  }

  async delete(id: ObjectId): Promise<Todo | null> {
    return await TodoMongooseModel.findByIdAndDelete(id)
  }

  async findByDone(): Promise<Todo[]> {
    return await TodoMongooseModel.find({ done: true })
  }
}