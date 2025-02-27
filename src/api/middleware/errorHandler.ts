import { Request, Response } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
  return
}
