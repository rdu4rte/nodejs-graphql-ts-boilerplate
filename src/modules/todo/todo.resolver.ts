import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Todo } from '../../entities'
import TodoService from './todo.service'
import { ObjectId } from 'mongodb'
import { TodoDto } from './dto/todo.dto'
import { isAuth, HttpCtx } from '../../middlewares'

@Service()
@Resolver(() => Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) { }

  @Query(() => Todo)
  @UseMiddleware(isAuth)
  async getTodo(@Ctx() { payload }: HttpCtx, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.getById(id, payload!.id)
  }

  @Query(() => [Todo])
  @UseMiddleware(isAuth)
  async getAll(@Ctx() { payload }: HttpCtx): Promise<Todo[]> {
    return await this.todoService.getAll(payload!.id)
  }

  @Query(() => [Todo])
  @UseMiddleware(isAuth)
  async getByDone(@Ctx() { payload }: HttpCtx): Promise<Todo[]> {
    return await this.todoService.findByDone(payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async createTodo(@Ctx() { payload }: HttpCtx, @Arg('createTodoData') createTodoData: TodoDto): Promise<Todo> {
    return await this.todoService.addTodo(createTodoData, payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async updateOne(@Ctx() { payload }: HttpCtx, @Arg('updateContent') updateContent: TodoDto, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.updateOne(id, updateContent, payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async delete(@Ctx() { payload }: HttpCtx, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.deleteOne(id, payload!.id)
  }
}