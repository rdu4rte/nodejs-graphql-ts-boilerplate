import * as jwt from 'jsonwebtoken'
import { User } from '../entities/user.entity'

export const generateJwtToken = async (user: User): Promise<{ token: string }> => {
  const payload = { id: user._id }
  const token = jwt.sign(payload, 'secr3t', {
    expiresIn: 3600
  })
  return { token }
}