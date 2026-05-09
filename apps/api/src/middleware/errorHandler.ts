import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message, { stack: err.stack })
  res.status(err.statusCode || 500).json({ success: false, error: err.message || 'Internal Server Error' })
}
