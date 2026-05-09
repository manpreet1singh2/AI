import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ success: false, error: 'No token provided' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    ;(req as any).user = payload
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' })
  }
}
