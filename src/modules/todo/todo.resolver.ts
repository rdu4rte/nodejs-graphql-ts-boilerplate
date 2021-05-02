import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Todo } from '../../entities'
import TodoService from './todo.service'
import { ObjectId } from 'mongodb'
import { TodoDto } from './dto/todo.dto'
import { isAuth, HttpCtx } from '../../middlewares'

@Service()
@Resolver((of) => Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) { }

  @Query((returns) => Todo)
  @UseMiddleware(isAuth)
  async getTodo(@Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.getById(id)
  }

  @Query((returns) => [Todo])
  @UseMiddleware(isAuth)
  async getAll(@Ctx() { payload }: HttpCtx): Promise<Todo[]> {
    return await this.todoService.getAll(payload!.id)
  }

  @Query((returns) => [Todo])
  @UseMiddleware(isAuth)
  async getByDone(): Promise<Todo[]> {
    return await this.todoService.findByDone()
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async createTodo(@Ctx() { payload }: HttpCtx, @Arg('createTodoData') createTodoData: TodoDto): Promise<Todo> {
    return await this.todoService.addTodo(createTodoData, payload!.id)
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async updateOne(@Arg('updateContent') updateContent: TodoDto, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.updateOne(id, updateContent)
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async delete(@Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.deleteOne(id)
  }
}