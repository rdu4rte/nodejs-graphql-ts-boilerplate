import { buildSchema } from 'type-graphql'
import Container from 'typedi'
import { ObjectId } from 'mongodb'
import { ObjectIdScalar } from './'
import { resolvers } from '../modules'
import { GraphQLSchema } from 'graphql/type'

export const gqlbuildSchema = async (): Promise<GraphQLSchema> =>
  await buildSchema({
    resolvers,
    container: Container,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }]
  })