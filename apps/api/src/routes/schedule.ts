import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'

export const scheduleRoutes = Router()

scheduleRoutes.get('/', authenticate, async (req, res) => {
  const { startDate, endDate, platform } = req.query
  // TODO: prisma.scheduledPost.findMany(...)
  res.json({ success: true, data: [] })
})

scheduleRoutes.post('/', authenticate,
  [
    body('contentId').isString(),
    body('platform').isString(),
    body('accountId').isString(),
    body('scheduledAt').isISO8601(),
  ],
  validate,
  async (req, res) => {
    const { contentId, platform, accountId, scheduledAt } = req.body
    const scheduledPost = {
      id: `sched-${Date.now()}`,
      contentId,
      platform,
      accountId,
      scheduledAt,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }
    // TODO: prisma create + queue job
    res.status(201).json({ success: true, data: scheduledPost })
  }
)

scheduleRoutes.put('/:id', authenticate, async (req, res) => {
  res.json({ success: true, data: { id: req.params.id, ...req.body } })
})

scheduleRoutes.delete('/:id', authenticate, async (req, res) => {
  // TODO: cancelScheduledPost from queue
  res.json({ success: true, message: 'Scheduled post cancelled' })
})
