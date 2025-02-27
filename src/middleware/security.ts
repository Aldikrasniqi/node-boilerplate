import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import compression from 'compression'

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Request validation middleware
export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid request data',
          errors: error.errors
        })
      }
      next(error)
    }
  }
}

// Compression middleware
export const compressionMiddleware = compression({
  level: 6, // compression level
  threshold: 100 * 1000 // only compress responses above 100kb
})
