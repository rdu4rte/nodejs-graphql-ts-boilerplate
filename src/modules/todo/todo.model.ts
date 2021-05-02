import { getModelForClass } from '@typegoose/typegoose'
import { Todo } from '../../entities'
import { ObjectId } from 'mongodb'
import { TodoDto } from './dto/todo.dto'
import { Service } from 'typedi'
import UserModel from '../user/user.model'

// mongoose model
export const TodoMongooseModel = getModelForClass(Todo)

@Service()
export default class TodoModel {
  constructor(private readonly userModel: UserModel) { }

  async getById(_id: ObjectId): Promise<Todo | null> {
    return await TodoMongooseModel.findById(_id).lean().exec()
  }

  async create(data: TodoDto, payload: ObjectId): Promise<Todo> {
    const user = await this.userModel.findById(payload)

    const todo = new TodoMongooseModel({
      content: data.content,
      _user: user
    })

    await todo.save()
    return todo
  }

  async find(payload: ObjectId): Promise<Todo[]> {
    return await TodoMongooseModel.find({ _user: payload })
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