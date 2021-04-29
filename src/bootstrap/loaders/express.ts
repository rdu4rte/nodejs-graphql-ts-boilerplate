import { Application, json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from '../../config'

export default async (app: Application): Promise<void> => {
  // only required during POST requests on the graphql path
  app.use(config.gqlPath, json())

  app.use(cors())

  app.use(helmet())
}