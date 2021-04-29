import { ApolloServer } from 'apollo-server-express'
import { config } from '../../config'

export default async (): Promise<ApolloServer> => {
  // const schema = await buildSchema()

  return new ApolloServer({
    // schema,
    playground: config.isDev
  })
}