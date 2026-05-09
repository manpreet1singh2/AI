import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'

export const brandRoutes = Router()

brandRoutes.get('/', authenticate, async (req, res) => {
  // TODO: prisma.brandKit.findFirst(...)
  res.json({ success: true, data: null })
})

brandRoutes.post('/', authenticate,
  [
    body('name').optional().isString(),
    body('primaryColor').isString(),
    body('fontFamily').optional().isString(),
  ],
  validate,
  async (req, res) => {
    const brandKit = {
      id: `brand-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    }
    // TODO: prisma.brandKit.create(...)
    res.status(201).json({ success: true, data: brandKit })
  }
)

brandRoutes.put('/', authenticate, async (req, res) => {
  // TODO: prisma.brandKit.update(...)
  res.json({ success: true, data: { ...req.body, updatedAt: new Date().toISOString() } })
})
