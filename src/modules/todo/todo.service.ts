import { Service } from 'typedi'
import TodoModel from './todo.model'
import { ObjectId } from 'mongodb'
import { Todo } from '../../entities'
import { TodoDto } from './dto/todo.dto'

@Service()
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) { }

  public async getById(_id: ObjectId, payload: ObjectId): Promise<Todo | null> {
    return await this.todoModel.getById(_id, payload)
  }

  public async addTodo(data: TodoDto, payload: ObjectId): Promise<Todo> {
    const newTodo = await this.todoModel.create(data, payload)
    return newTodo
  }

  public async getAll(payload: ObjectId): Promise<Todo[]> {
    return await this.todoModel.find(payload)
  }

  public async updateOne(id: ObjectId, data: TodoDto, payload: ObjectId): Promise<Todo | null> {
    return await this.todoModel.update(id, data, payload)
  }

  public async deleteOne(id: ObjectId, payload: ObjectId): Promise<Todo | null> {
    return await this.todoModel.delete(id, payload)
  }

  public async findByDone(payload: ObjectId): Promise<Todo[]> {
    return await this.todoModel.findByDone(payload)
  }
}