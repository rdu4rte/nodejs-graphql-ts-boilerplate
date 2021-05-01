import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { User } from '../../entities'
import UserService from './user.service'
import { UserDto } from './dto/user.dto'
import { isAuth } from '../../middlewares'
import { JwtResponse, CredentialsDto } from './dto/credentials.dto'

@Service()
@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query((returns) => [User])
  @UseMiddleware(isAuth)
  async getUsers(): Promise<User[]> {
    return await this.userService.fetchUsers()
  }

  @Mutation((returns) => User)
  async createUser(@Arg('createUser') createUserData: UserDto): Promise<User> {
    return await this.userService.createUser(createUserData)
  }

  @Mutation(() => JwtResponse)
  async login(@Arg('credentials') credentials: CredentialsDto): Promise<JwtResponse> {
    return await this.userService.login(credentials)
  }
}