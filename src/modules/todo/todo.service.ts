import { Service } from 'typedi'
import TodoModel from './todo.model'
import { ObjectId } from 'mongodb'
import { Todo } from '../../entities'
import { TodoDto } from './todo.dto'

@Service()
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) {}

  public async getById(_id: ObjectId): Promise<Todo | null> {
    return this.todoModel.getById(_id)
  }

  public async addTodo(data: TodoDto): Promise<Todo> {
    const newTodo = await this.todoModel.create(data)

    // business logic here ...

    return newTodo
  }
}