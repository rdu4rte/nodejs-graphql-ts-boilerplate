import dotenv from 'dotenv'
dotenv.config()

const env = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing: process.env.['${name}']`)
  }
  return value
}

export interface Config {
  port: number
  gqlPath: string
  isDev: boolean
  mongoDb: {
    uri: string
  }
  jwt: {
    secret: string
    expiresIn: number
  }
  argonSalt: number
}

export const config: Config = {
  port: +env('CUSTOM_PORT'),
  gqlPath: env('GRAPHQL_PATH'),
  isDev: env('NODE_ENV') === 'development',
  mongoDb: {
    uri: env('MONGODB_URI')
  },
  jwt: {
    secret: env('JWT_SECRET'),
    expiresIn: +env('JWT_EXPIRESIN')
  },
  argonSalt: +env('SALT')
}