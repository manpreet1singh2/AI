import { Queue, Worker, QueueEvents } from 'bullmq'
import IORedis from 'ioredis'
import { logger } from '../utils/logger'
import { SocialPublisherFactory } from '../services/social/publisher'
import { aiContentService, aiImageService } from '../services/ai/aiService'

// ============ REDIS CONNECTION ============
export const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
})

// ============ QUEUE DEFINITIONS ============
export const publishingQueue = new Queue('publishing', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 200 },
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  },
})

export const aiGenerationQueue = new Queue('ai-generation', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 100 },
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
  },
})

export const analyticsQueue = new Queue('analytics', {
  connection: redisConnection,
  defaultJobOptions: {
    removeOnComplete: { count: 200 },
    attempts: 3,
  },
})

// ============ WORKERS ============

// Publishing Worker
const publishingWorker = new Worker(
  'publishing',
  async (job) => {
    const { scheduledPostId, platform, accessToken, accountId, caption, hashtags, mediaUrls, metadata } = job.data

    logger.info(`Publishing job ${job.id} for platform ${platform}`)

    const result = await SocialPublisherFactory.publish({
      platform,
      accessToken,
      accountId,
      caption,
      hashtags,
      mediaUrls,
      metadata,
    })

    if (!result.success) {
      throw new Error(result.error || 'Publish failed')
    }

    // Update DB with platformPostId
    // await prisma.scheduledPost.update({ where: { id: scheduledPostId }, data: { ... } })

    logger.info(`✅ Published to ${platform}: ${result.platformPostId}`)
    return result
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
)

// AI Generation Worker
const aiGenerationWorker = new Worker(
  'ai-generation',
  async (job) => {
    const { type, prompt, options, jobId } = job.data

    logger.info(`AI generation job ${job.id} type: ${type}`)

    let result: any

    switch (type) {
      case 'TEXT_GENERATION':
        result = await aiContentService.generateContent({ prompt, ...options })
        break
      case 'IMAGE_GENERATION':
        result = await aiImageService.generateImage({ prompt, ...options })
        break
      case 'HASHTAG_GENERATION':
        result = await aiContentService.generateHashtags(prompt, options.platform)
        break
      default:
        throw new Error(`Unknown generation type: ${type}`)
    }

    // Update AIJob in DB with result
    // await prisma.aIJob.update({ where: { id: jobId }, data: { status: 'COMPLETED', result } })

    return result
  },
  {
    connection: redisConnection,
    concurrency: 3,
  }
)

// ============ ERROR HANDLERS ============
publishingWorker.on('failed', (job, err) => {
  logger.error(`Publishing job ${job?.id} failed:`, err.message)
})

aiGenerationWorker.on('failed', (job, err) => {
  logger.error(`AI generation job ${job?.id} failed:`, err.message)
})

publishingWorker.on('completed', (job) => {
  logger.info(`Publishing job ${job.id} completed`)
})

// ============ HELPER FUNCTIONS ============
export async function schedulePost(data: {
  scheduledPostId: string
  scheduledAt: Date
  platform: string
  accessToken: string
  accountId: string
  caption: string
  hashtags: string[]
  mediaUrls: string[]
  metadata?: Record<string, any>
}) {
  const delay = data.scheduledAt.getTime() - Date.now()

  if (delay <= 0) {
    // Publish immediately
    return publishingQueue.add('publish', data, { priority: 1 })
  }

  return publishingQueue.add('publish', data, {
    delay: Math.max(delay, 0),
    jobId: `post-${data.scheduledPostId}`,
  })
}

export async function queueAIGeneration(data: {
  jobId: string
  type: string
  prompt: string
  options: Record<string, any>
}) {
  return aiGenerationQueue.add('generate', data, { priority: 2 })
}

export async function cancelScheduledPost(scheduledPostId: string) {
  const job = await publishingQueue.getJob(`post-${scheduledPostId}`)
  if (job) {
    await job.remove()
    logger.info(`Cancelled scheduled post: ${scheduledPostId}`)
    return true
  }
  return false
}

// ============ INIT ============
export async function initQueues() {
  try {
    await redisConnection.ping()
    logger.info('✅ Queue system initialized')
    logger.info(`📋 Publishing queue: active`)
    logger.info(`🤖 AI generation queue: active`)
  } catch (error) {
    logger.error('❌ Queue initialization failed:', error)
    throw error
  }
}

export { publishingWorker, aiGenerationWorker }
