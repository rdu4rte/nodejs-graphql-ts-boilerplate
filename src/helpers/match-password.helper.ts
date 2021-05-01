import * as argon2 from 'argon2'

export const matchPassword = async (pass1: string, pass2: string): Promise<boolean> => {
  return await argon2.verify(pass1, pass2)
}