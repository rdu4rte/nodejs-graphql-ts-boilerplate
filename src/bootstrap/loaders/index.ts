import { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'

// loaders
import apolloLoader from './apollo'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (app: Application): Promise<ApolloServer> => {
  await expressLoader(app).then(() => console.log('express loaded'))
  await mongooseLoader().then(() => console.log('mongodb connected'))
  return apolloLoader()
}