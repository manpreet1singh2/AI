import { Router } from 'express'
import { logger } from '../utils/logger'

export const webhookRoutes = Router()

webhookRoutes.post('/instagram', (req, res) => {
  const { object, entry } = req.body
  if (object === 'instagram') {
    logger.info('Instagram webhook received:', JSON.stringify(entry))
  }
  res.sendStatus(200)
})

webhookRoutes.get('/instagram', (req, res) => {
  // Instagram webhook verification
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    res.status(200).send(challenge)
  } else {
    res.sendStatus(403)
  }
})

webhookRoutes.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature']
  try {
    // TODO: verify stripe signature and handle events
    const event = req.body
    switch (event.type) {
      case 'invoice.payment_succeeded':
        logger.info('Stripe payment succeeded:', event.data.object.id)
        break
      case 'customer.subscription.deleted':
        logger.info('Stripe subscription cancelled:', event.data.object.id)
        break
    }
    res.sendStatus(200)
  } catch (err: any) {
    logger.error('Stripe webhook error:', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
  }
})

webhookRoutes.post('/tiktok', (req, res) => {
  logger.info('TikTok webhook:', req.body)
  res.sendStatus(200)
})
