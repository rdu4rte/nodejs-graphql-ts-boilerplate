import 'reflect-metadata'

import bootstrap from './bootstrap'
import { config } from './config'
bootstrap(config).catch(err => {
  console.log(err)
  process.exit(0)
})