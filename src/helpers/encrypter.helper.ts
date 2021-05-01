import { randomBytes } from 'crypto'
import { config } from '../config'
import * as argon2 from 'argon2'

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(config.argonSalt)
  return await argon2.hash(password, { salt })
}