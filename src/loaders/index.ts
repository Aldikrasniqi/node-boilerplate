import expressLoader from './express'
import logger from '../config/logger'
import { Application } from 'express'

interface LoaderOptions {
  expressApp: Application
}

async function init({ expressApp }: LoaderOptions): Promise<void> {
  expressLoader({ app: expressApp })
  logger.info('Express initialized')
}

export default { init }
