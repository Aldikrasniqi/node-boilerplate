import pino from 'pino'
import pinoHttp from 'pino-http'
import { Request, Response, NextFunction } from 'express'
import { randomUUID } from 'crypto'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
})

// Create the HTTP logger middleware
const httpLoggerMiddleware = pinoHttp({
  logger,
  // Customize the logging output
  customProps: () => ({
    context: 'HTTP'
  }),
  // Auto-assign request id if not present
  genReqId: (req) => (req as any).id || randomUUID()
})

// Export a properly typed Express middleware
export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  return httpLoggerMiddleware(req, res, next)
}

export default logger
