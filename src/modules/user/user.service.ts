import { Service } from 'typedi'
import UserModel from './user.model'
import { UserDto } from './user.dto'
import { User } from '../../entities/user.entity'
import { hashPassword } from '../../helpers'

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
}