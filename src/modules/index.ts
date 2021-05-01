import TodoResolver from './todo/todo.resolver'
import UserResolver from './user/user.resolver'

export const resolvers: [Function, ...Function[]] = [
  TodoResolver,
  UserResolver
]