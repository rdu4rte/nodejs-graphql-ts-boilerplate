import { MiddlewareFn } from 'type-graphql'
import { HttpCtx } from './http-context.interface'
import { Logger, config } from '../../config'
import * as jwt from 'jsonwebtoken'

export const isAuth: MiddlewareFn<HttpCtx> = async ({ context }, next) => {
  const bearerToken = context.req.headers.authorization

  if (!bearerToken) {
    throw new Error('Not authorized')
  }

  try {
    const token = bearerToken.split(' ')[1]
    const payload = jwt.verify(token, config.jwt.secret)
    context.payload = payload as HttpCtx['payload']
  } catch (err) {
    Logger.error(`Not authorized: ${err}`)
    throw new Error('Not authorized, you must log in to access this content')
  }

  return next()
}