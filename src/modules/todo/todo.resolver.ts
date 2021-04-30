import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Todo } from '../../entities'
import TodoService from './todo.service'
import { ObjectId } from 'mongodb'
import { TodoDto } from './todo.dto'

@Service()
@Resolver((of) => Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) { }

  @Query((returns) => Todo)
  async getTodo(@Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.getById(id)
  }

  @Query((returns) => [Todo])
  async getAll(): Promise<Todo[]> {
    return await this.todoService.getAll()
  }

  @Mutation((returns) => Todo)
  async createTodo(@Arg('createTodoData') createTodoData: TodoDto): Promise<Todo> {
    return await this.todoService.addTodo(createTodoData)
  }

  @Mutation((returns) => Todo)
  async updateOne(@Arg('updateContent') updateContent: TodoDto, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.updateOne(id, updateContent)
  }

  @Mutation((returns) => Todo)
  async delete(@Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.deleteOne(id)
  }
}