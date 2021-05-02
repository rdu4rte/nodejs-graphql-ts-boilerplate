import { Service } from 'typedi'
import TodoModel from './todo.model'
import { ObjectId } from 'mongodb'
import { Todo } from '../../entities'
import { TodoDto } from './dto/todo.dto'

@Service()
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) { }

  public async getById(_id: ObjectId): Promise<Todo | null> {
    return this.todoModel.getById(_id)
  }

  public async addTodo(data: TodoDto, payload: ObjectId): Promise<Todo | any> {
    const newTodo = await this.todoModel.create(data, payload)
    return newTodo
  }

  public async getAll(payload: ObjectId): Promise<Todo[]> {
    return this.todoModel.find(payload)
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