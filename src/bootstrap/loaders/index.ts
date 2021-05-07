import { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { Logger } from '../../config'

// loaders
import apolloLoader from './apollo'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (app: Application): Promise<ApolloServer> => {
  await expressLoader(app)
  await mongooseLoader()
  await apolloLoader()
  Logger.info('[Loaders] Express, MongoDB & Apollo Loaded')
  return apolloLoader()
}