import * as jwt from 'jsonwebtoken'
import { User } from '../entities/user.entity'
import { config } from '../config'

export const generateJwtToken = async (user: User): Promise<{ token: string }> => {
  const payload = { id: user._id }
  const token = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
  return { token }
}