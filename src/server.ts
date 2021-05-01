import 'reflect-metadata'

import bootstrap from './bootstrap'
import { config, Logger } from './config'
bootstrap(config).catch(err => {
  Logger.error(err)
})