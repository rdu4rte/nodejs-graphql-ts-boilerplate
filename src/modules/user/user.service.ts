import { Service } from 'typedi'
import UserModel from './user.model'
import { UserDto } from './dto/user.dto'
import { User } from '../../entities/user.entity'
import { hashPassword } from '../../helpers'
import { CredentialsDto, JwtResponse } from './dto/credentials.dto'
import { matchPassword } from '../../helpers/match-password.helper'
import { Logger } from '../../config'
import { generateJwtToken } from '../../helpers/generate-token.helper'

@Service()
export default class UserService {
  constructor(private readonly userModel: UserModel) { }

  public async createUser(data: UserDto): Promise<User> {
    const { username, email, password, password_confirm } = data
    const newUser = new User()

    if (password !== password_confirm) {
      throw new Error('Passwords dont match')
    }

    newUser.username = username
    newUser.email = email
    newUser.password = await hashPassword(password)

    return await this.userModel.create(newUser)
  }

  public async fetchUsers(): Promise<User[]> {
    return await this.userModel.getAll()
  }

  public async login(credentials: CredentialsDto): Promise<JwtResponse> {
    const user = await this.userModel.findByUsername(credentials.username)

    if (!user) {
      Logger.error('No user found')
      throw new Error('No user found')
    }

    const isMatch: boolean = await matchPassword(user.password, credentials.password)

    if (user && isMatch) {
      return await generateJwtToken(user)
    } else {
      throw new Error('Authentication failed')
    }
  }
}