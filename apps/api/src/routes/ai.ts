import { Router } from 'express'
import { body, param, query } from 'express-validator'
import { validate } from '../middleware/validate'
import { authenticate } from '../middleware/auth'
import { aiContentService, aiImageService, aiVoiceService } from '../services/ai/aiService'
import { queueAIGeneration } from '../queue/setup'
import { logger } from '../utils/logger'

export const aiRoutes = Router()

// ============ GENERATE CONTENT ============
aiRoutes.post(
  '/generate/content',
  authenticate,
  [
    body('prompt').isString().isLength({ min: 5, max: 1000 }),
    body('platform').isString().isIn(['instagram', 'youtube', 'tiktok', 'linkedin', 'twitter', 'facebook']),
    body('contentType').optional().isString(),
    body('tone').optional().isString(),
    body('count').optional().isInt({ min: 1, max: 10 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { prompt, platform, contentType, tone, count = 1 } = req.body

      const content = await aiContentService.generateContent({
        prompt,
        platform,
        contentType,
        tone,
        count,
      })

      res.json({
        success: true,
        data: content,
        count: content.length,
      })
    } catch (error: any) {
      logger.error('Content generation route error:', error)
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ GENERATE IMAGE ============
aiRoutes.post(
  '/generate/image',
  authenticate,
  [
    body('prompt').isString().isLength({ min: 5, max: 1000 }),
    body('style').optional().isString(),
    body('aspectRatio').optional().isIn(['1:1', '9:16', '16:9', '4:5']),
    body('count').optional().isInt({ min: 1, max: 4 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { prompt, style, aspectRatio, count } = req.body

      const urls = await aiImageService.generateImage({
        prompt,
        style,
        aspectRatio,
        count,
      })

      res.json({ success: true, data: { urls } })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ GENERATE HASHTAGS ============
aiRoutes.post(
  '/generate/hashtags',
  authenticate,
  [
    body('topic').isString().isLength({ min: 2, max: 200 }),
    body('platform').isString(),
    body('count').optional().isInt({ min: 5, max: 50 }),
  ],
  validate,
  async (req, res) => {
    try {
      const { topic, platform, count } = req.body
      const hashtags = await aiContentService.generateHashtags(topic, platform, count)
      res.json({ success: true, data: { hashtags } })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ GENERATE HOOKS ============
aiRoutes.post(
  '/generate/hooks',
  authenticate,
  [body('topic').isString(), body('count').optional().isInt()],
  validate,
  async (req, res) => {
    try {
      const { topic, count } = req.body
      const hooks = await aiContentService.generateHooks(topic, count)
      res.json({ success: true, data: { hooks } })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ SCORE CONTENT ============
aiRoutes.post(
  '/score',
  authenticate,
  [body('content').isString(), body('platform').isString()],
  validate,
  async (req, res) => {
    try {
      const { content, platform } = req.body
      const score = await aiContentService.scoreContent(content, platform)
      res.json({ success: true, data: score })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ GENERATE THUMBNAIL ============
aiRoutes.post(
  '/generate/thumbnail',
  authenticate,
  [body('title').isString(), body('style').optional().isString()],
  validate,
  async (req, res) => {
    try {
      const { title, style } = req.body
      const url = await aiImageService.generateThumbnail(title, style || 'cinematic')
      res.json({ success: true, data: { url } })
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

// ============ GENERATE VOICEOVER ============
aiRoutes.post(
  '/generate/voiceover',
  authenticate,
  [body('text').isString().isLength({ max: 2500 }), body('voiceId').optional().isString()],
  validate,
  async (req, res) => {
    try {
      const { text, voiceId } = req.body
      const audioBuffer = await aiVoiceService.generateVoiceover(text, voiceId)

      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
        'Content-Disposition': 'attachment; filename="voiceover.mp3"',
      })
      res.send(audioBuffer)
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message })
    }
  }
)
