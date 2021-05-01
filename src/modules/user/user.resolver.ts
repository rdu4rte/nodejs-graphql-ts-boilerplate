import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '../../entities'
import UserService from './user.service'
import { UserDto } from './user.dto'

@Service()
@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query((returns) => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.fetchUsers()
  }

  @Mutation((returns) => User)
  async createUser(@Arg('createUser') createUserData: UserDto): Promise<User> {
    return await this.userService.createUser(createUserData)
  }
}