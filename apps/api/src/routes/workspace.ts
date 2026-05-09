import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'

export const workspaceRoutes = Router()

workspaceRoutes.get('/', authenticate, async (req, res) => {
  const userId = (req as any).user?.userId
  // TODO: prisma.workspaceMember.findMany(...)
  res.json({ success: true, data: [] })
})

workspaceRoutes.post('/', authenticate,
  [
    body('name').isString().isLength({ min: 2, max: 100 }),
    body('slug').isString().isAlphanumeric().isLength({ min: 2, max: 50 }),
  ],
  validate,
  async (req, res) => {
    const userId = (req as any).user?.userId
    const workspace = {
      id: `ws-${Date.now()}`,
      ...req.body,
      ownerId: userId,
      plan: 'FREE',
      createdAt: new Date().toISOString(),
    }
    // TODO: prisma.workspace.create(...)
    res.status(201).json({ success: true, data: workspace })
  }
)

workspaceRoutes.get('/:id', authenticate, async (req, res) => {
  res.json({ success: true, data: { id: req.params.id } })
})

workspaceRoutes.put('/:id', authenticate, async (req, res) => {
  res.json({ success: true, data: { id: req.params.id, ...req.body } })
})

workspaceRoutes.delete('/:id', authenticate, async (req, res) => {
  res.json({ success: true, message: 'Workspace deleted' })
})

// Invite member
workspaceRoutes.post('/:id/members', authenticate,
  [body('email').isEmail(), body('role').isIn(['ADMIN', 'EDITOR', 'VIEWER'])],
  validate,
  async (req, res) => {
    const { email, role } = req.body
    // TODO: send invite email + create pending member
    res.json({ success: true, message: `Invite sent to ${email}` })
  }
)

// Remove member
workspaceRoutes.delete('/:id/members/:userId', authenticate, async (req, res) => {
  res.json({ success: true, message: 'Member removed' })
})
