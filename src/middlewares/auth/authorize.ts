import { MiddlewareFn } from 'type-graphql'
import { HttpCtx } from './http-context.interface'
import { Logger } from '../../config'
import * as jwt from 'jsonwebtoken'

export const isAuth: MiddlewareFn<HttpCtx> = async ({ context }, next) => {
  const authHeaders = context.req.headers.authorization

  if (!authHeaders) {
    throw new Error('Not authorized')
  }

  try {
    const token = authHeaders.split(' ')[1]
    const payload = jwt.verify(token, 'secr3t')
    context.payload = payload as any
  } catch (err) {
    Logger.error(`Not authorized: ${err}`)
    throw new Error('Not authorized, you must log in to access this content')
  }

  return next()
}