import { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { Logger } from '../../config'

// loaders
import apolloLoader from './apollo'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (app: Application): Promise<ApolloServer> => {
  await expressLoader(app).then(() => Logger.info('[Express] Loaded'))
  await mongooseLoader().then(() => Logger.info('[MongoDB] Loaded'))
  await apolloLoader().then(() => Logger.info('[ApolloServer] Loaded'))
  return apolloLoader()
}