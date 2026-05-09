// ============ AUTH ROUTES ============
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { logger } from '../utils/logger'

export const authRoutes = Router()

authRoutes.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').isString().isLength({ min: 2, max: 100 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password, name } = req.body
      const hashed = await bcrypt.hash(password, 12)

      // TODO: save to DB via Prisma
      const user = { id: 'mock-id', email, name, role: 'USER', plan: 'FREE' }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      res.status(201).json({
        success: true,
        data: { user, token },
      })
    } catch (error: any) {
      logger.error('Register error:', error)
      res.status(500).json({ success: false, error: 'Registration failed' })
    }
  }
)

authRoutes.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isString().isLength({ min: 1 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body
      // TODO: fetch from DB
      const mockUser = { id: 'mock-id', email, name: 'Test User', role: 'USER', plan: 'FREE', password: await bcrypt.hash('password', 12) }

      const valid = await bcrypt.compare(password, mockUser.password)
      if (!valid) return res.status(401).json({ success: false, error: 'Invalid credentials' })

      const token = jwt.sign(
        { userId: mockUser.id, email: mockUser.email, role: mockUser.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      const { password: _, ...user } = mockUser
      res.json({ success: true, data: { user, token } })
    } catch (error: any) {
      res.status(500).json({ success: false, error: 'Login failed' })
    }
  }
)

authRoutes.post('/refresh', async (req, res) => {
  const { token } = req.body
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    const newToken = jwt.sign(
      { userId: payload.userId, email: payload.email, role: payload.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )
    res.json({ success: true, data: { token: newToken } })
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' })
  }
})

// ============ STUB ROUTES ============
export const contentRoutes = Router()
contentRoutes.get('/', (req, res) => res.json({ success: true, data: [], total: 0 }))
contentRoutes.post('/', (req, res) => res.status(201).json({ success: true, data: { id: 'new-id', ...req.body } }))
contentRoutes.get('/:id', (req, res) => res.json({ success: true, data: { id: req.params.id } }))
contentRoutes.put('/:id', (req, res) => res.json({ success: true, data: { id: req.params.id, ...req.body } }))
contentRoutes.delete('/:id', (req, res) => res.json({ success: true, message: 'Deleted' }))

export const socialRoutes = Router()
socialRoutes.get('/accounts', (req, res) => res.json({ success: true, data: [] }))
socialRoutes.post('/accounts/connect', (req, res) => res.json({ success: true, data: { connected: true } }))
socialRoutes.delete('/accounts/:id', (req, res) => res.json({ success: true, message: 'Disconnected' }))

export const scheduleRoutes = Router()
scheduleRoutes.get('/', (req, res) => res.json({ success: true, data: [] }))
scheduleRoutes.post('/', (req, res) => res.status(201).json({ success: true, data: { id: 'sched-id', ...req.body } }))
scheduleRoutes.delete('/:id', (req, res) => res.json({ success: true, message: 'Cancelled' }))

export const analyticsRoutes = Router()
analyticsRoutes.get('/overview', (req, res) => res.json({
  success: true,
  data: {
    totalReach: 2400000,
    totalEngagement: 8.7,
    totalFollowers: 124000,
    contentPublished: 847,
    platforms: [],
  },
}))

export const brandRoutes = Router()
brandRoutes.get('/', (req, res) => res.json({ success: true, data: null }))
brandRoutes.post('/', (req, res) => res.status(201).json({ success: true, data: { id: 'brand-id', ...req.body } }))

export const webhookRoutes = Router()
webhookRoutes.post('/instagram', (req, res) => res.sendStatus(200))
webhookRoutes.post('/stripe', (req, res) => res.sendStatus(200))

export const workspaceRoutes = Router()
workspaceRoutes.get('/', (req, res) => res.json({ success: true, data: [] }))
workspaceRoutes.post('/', (req, res) => res.status(201).json({ success: true, data: { id: 'ws-id', ...req.body } }))
