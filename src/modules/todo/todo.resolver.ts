import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Todo } from '../../entities'
import TodoService from './todo.service'
import { ObjectId } from 'mongodb'
import { TodoDto } from './todo.dto'

@Service()
@Resolver((of) => Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query((returns) => Todo)
  async getTodo(@Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.getById(id)
  }

  @Mutation((returns) => Todo)
  async createTodo(@Arg('createTodoData') createTodoData: TodoDto): Promise<Todo> {
    console.log(createTodoData)
    return await this.todoService.addTodo(createTodoData)
  }
}