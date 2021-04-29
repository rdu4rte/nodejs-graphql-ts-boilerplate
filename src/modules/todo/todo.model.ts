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
    return TodoMongooseModel.findById(_id).lean().exec()
  }

  async create(data: TodoDto): Promise<Todo> {
    const todo = new TodoMongooseModel(data)
    await todo.save()
    return todo
  }
}