import { getModelForClass } from '@typegoose/typegoose'
import { Service } from 'typedi'
import { User } from '../../entities/user.entity'

// mongoose model
export const UserMongooseModel = getModelForClass(User)

@Service()
export default class UserModel {
  async create(data: User): Promise<User> {
    const newUser = new UserMongooseModel(data)
    await newUser.save()
    return newUser
  }

  async getAll(): Promise<User[]> {
    return await UserMongooseModel.find()
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await UserMongooseModel.findOne({ username: username }).select('+password')
    return user
  }
}