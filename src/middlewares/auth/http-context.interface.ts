import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'

export interface HttpCtx {
  req: Request
  res: Response
  payload?: {
    id: ObjectId
    iat: number
    exp: number
  }
}