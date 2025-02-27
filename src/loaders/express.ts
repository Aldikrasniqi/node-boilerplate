import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from '../api/routes'
import { errorHandler } from '../api/middleware/errorHandler'
import path from 'path'

interface ExpressLoaderOptions {
  app: Application
}

export default ({ app }: ExpressLoaderOptions): Application => {
  // Health Check
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK')
  })

  // Standard middleware
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, 'public')))

  // Load API route
  app.use('/api/v1', router)

  // 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error('Not Found')
    error.status = 404
    next(error)
  })

  // Error handling middleware
  app.use(errorHandler)

  return app
}
