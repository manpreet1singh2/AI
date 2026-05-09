import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'

export const socialRoutes = Router()

// GET /api/v1/social/accounts — list connected accounts
socialRoutes.get('/accounts', authenticate, async (req, res) => {
  // TODO: fetch from DB
  res.json({ success: true, data: [] })
})

// POST /api/v1/social/accounts/connect — initiate OAuth
socialRoutes.post('/accounts/connect', authenticate,
  [body('platform').isString(), body('code').optional().isString()],
  validate,
  async (req, res) => {
    const { platform } = req.body
    // TODO: OAuth flow per platform
    res.json({ success: true, data: { platform, authUrl: `https://oauth.${platform}.com/auth` } })
  }
)

// POST /api/v1/social/accounts/callback — OAuth callback
socialRoutes.post('/accounts/callback', authenticate,
  [body('platform').isString(), body('code').isString()],
  validate,
  async (req, res) => {
    const { platform, code } = req.body
    // TODO: exchange code for tokens, save to DB
    res.json({ success: true, data: { platform, connected: true, accountId: `acc-${Date.now()}` } })
  }
)

// DELETE /api/v1/social/accounts/:id — disconnect
socialRoutes.delete('/accounts/:id', authenticate, async (req, res) => {
  // TODO: delete from DB, revoke tokens
  res.json({ success: true, message: 'Account disconnected' })
})

// POST /api/v1/social/publish — direct publish
socialRoutes.post('/publish', authenticate,
  [
    body('platform').isString(),
    body('caption').isString(),
    body('accountId').isString(),
  ],
  validate,
  async (req, res) => {
    const { platform, caption, hashtags, mediaUrls, accountId } = req.body
    // TODO: call SocialPublisherFactory
    res.json({ success: true, data: { published: true, platformPostId: `post-${Date.now()}` } })
  }
)
