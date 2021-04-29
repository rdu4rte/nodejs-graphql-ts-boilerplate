import express from 'express'
import mongoose from 'mongoose'

import loaders from './loaders'
import { Config } from '../config'

export default async (config: Config): Promise<void> => {
  const app = express()
  const server = await loaders(app)

  server.applyMiddleware({
    app,
    path: config.gqlPath,
    onHealthCheck: async () => {
      if (mongoose.connection.readyState === 1) return
      throw new Error()
    }
  })

  app.listen(config.port, () => console.log(`🚀 server running at: http://localhost:${config.port}${config.gqlPath}`))
}