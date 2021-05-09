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
  async todo(@Ctx() { payload }: HttpCtx, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.getById(id, payload!.id)
  }

  @Query(() => [Todo])
  @UseMiddleware(isAuth)
  async todos(@Ctx() { payload }: HttpCtx): Promise<Todo[]> {
    return await this.todoService.getAll(payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async createTodo(@Ctx() { payload }: HttpCtx, @Arg('todo') todo: TodoDto): Promise<Todo> {
    return await this.todoService.addTodo(todo, payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async update(@Ctx() { payload }: HttpCtx, @Arg('todo') todo: TodoDto, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.updateOne(id, todo, payload!.id)
  }

  @Mutation(() => Todo)
  @UseMiddleware(isAuth)
  async delete(@Ctx() { payload }: HttpCtx, @Arg('id') id: ObjectId): Promise<Todo | null> {
    return await this.todoService.deleteOne(id, payload!.id)
  }
}