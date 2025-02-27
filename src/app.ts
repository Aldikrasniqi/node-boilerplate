import express from 'express'
import swaggerUi from 'swagger-ui-express'
import helmet from 'helmet'
import cors from 'cors'
import loaders from './loaders'
import config from './config'
import logger from './config/logger'
import { swaggerSpec } from './config/swagger'
import { errorHandler } from './middleware/errorHandler'
import { rateLimiter, compressionMiddleware } from './middleware/security'
import { httpLogger } from './config/logger'

const app = express()

async function startServer(): Promise<void> {
  // Security middleware
  app.use(helmet())
  app.use(cors())
  app.use(rateLimiter)
  app.use(compressionMiddleware)

  // Logging middleware
  app.use(httpLogger)

  // API documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Load application modules
  await loaders.init({ expressApp: app })

  // Error handling middleware (should be last)
  app.use(errorHandler)

  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`)
    logger.info(`API Documentation available at http://localhost:${config.port}/api-docs`)
  })

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    logger.error('Unhandled Rejection:', err)
    process.exit(1)
  })

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception:', err)
    process.exit(1)
  })
}

export default startServer
