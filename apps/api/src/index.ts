import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import { rateLimit } from 'express-rate-limit'

import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { authRoutes } from './routes/auth'
import { contentRoutes } from './routes/content'
import { socialRoutes } from './routes/social'
import { scheduleRoutes } from './routes/schedule'
import { analyticsRoutes } from './routes/analytics'
import { brandRoutes } from './routes/brand'
import { aiRoutes } from './routes/ai'
import { webhookRoutes } from './routes/webhooks'
import { workspaceRoutes } from './routes/workspace'
import { initQueues } from './queue/setup'

const app = express()
const PORT = process.env.PORT || 4000

// ============ SECURITY & MIDDLEWARE ============
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(compression() as any)
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api', limiter)

// AI generation — stricter limit
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'AI generation rate limit exceeded.' },
})

// Body parsing
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// ============ HEALTH CHECK ============
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'Aura AI API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

// ============ API ROUTES ============
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/workspaces', workspaceRoutes)
app.use('/api/v1/content', contentRoutes)
app.use('/api/v1/social', socialRoutes)
app.use('/api/v1/schedule', scheduleRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/brand', brandRoutes)
app.use('/api/v1/ai', aiLimiter, aiRoutes)
app.use('/api/v1/webhooks', webhookRoutes)

// ============ ERROR HANDLING ============
app.use(notFound)
app.use(errorHandler)

// ============ START ============
async function bootstrap() {
  try {
    await initQueues()
    app.listen(PORT, () => {
      logger.info(`🚀 Aura AI API running on port ${PORT}`)
      logger.info(`📡 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

bootstrap()

export default app
