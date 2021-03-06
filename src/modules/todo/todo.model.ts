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

  async getById(_id: ObjectId, payload: ObjectId): Promise<Todo | null> {
    return await TodoMongooseModel.where({ _user: payload }).findOne({ _id: _id }).lean().exec()
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

  async update(id: ObjectId, data: TodoDto, payload: ObjectId): Promise<Todo | null> {
    return await TodoMongooseModel.findByIdAndUpdate(id, data).where({ _user: payload })
  }

  async delete(id: ObjectId, payload: ObjectId): Promise<Todo | null> {
    return await TodoMongooseModel.findByIdAndDelete(id).where({ _user: payload })
  }
}