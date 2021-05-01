import { Service } from 'typedi'
import TodoModel from './todo.model'
import { ObjectId } from 'mongodb'
import { Todo } from '../../entities'
import { TodoDto } from './todo.dto'

@Service()
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) { }

  public async getById(_id: ObjectId): Promise<Todo | null> {
    return this.todoModel.getById(_id)
  }

  public async addTodo(data: TodoDto): Promise<Todo> {
    const newTodo = await this.todoModel.create(data)

    // business logic here ...

    return newTodo
  }

  public async getAll(): Promise<Todo[]> {
    return this.todoModel.find()
  }

  public async updateOne(id: ObjectId, data: TodoDto): Promise<Todo | null> {
    return this.todoModel.update(id, data)
  }

  public async deleteOne(id: ObjectId): Promise<Todo | null> {
    return this.todoModel.delete(id)
  }

  public async findByDone(): Promise<Todo[]> {
    return this.todoModel.findByDone()
  }
}