import mongoose from 'mongoose'
import { config } from '../../config'

// close mongodb default connection
process.on('SIGNINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

export const mongoDbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true
}

// mongoose setup
export default async (): Promise<mongoose.Mongoose> =>
  mongoose.connect(config.mongoDb.uri, mongoDbConfig)