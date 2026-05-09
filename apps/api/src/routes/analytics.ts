import { Router } from 'express'
import { authenticate } from '../middleware/auth'

export const analyticsRoutes = Router()

analyticsRoutes.get('/overview', authenticate, async (req, res) => {
  const { startDate, endDate, workspaceId } = req.query
  // TODO: aggregate from DB + external APIs
  res.json({
    success: true,
    data: {
      totalReach: 3200000,
      avgEngagement: 9.4,
      totalFollowers: 152400,
      followerGrowth: 28400,
      contentPublished: 142,
      platforms: [
        { platform: 'instagram', reach: 1200000, engagement: 12.4, followers: 84000, followerGrowth: 2100, postsCount: 48 },
        { platform: 'youtube', reach: 840000, engagement: 8.2, followers: 38000, followerGrowth: 890, postsCount: 24 },
        { platform: 'tiktok', reach: 1160000, engagement: 14.1, followers: 30400, followerGrowth: 6800, postsCount: 70 },
      ],
    },
  })
})

analyticsRoutes.get('/content/:id', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: {
      contentId: req.params.id,
      views: 124000,
      likes: 8400,
      comments: 342,
      shares: 1200,
      saves: 5600,
      reach: 98000,
      impressions: 152000,
      engagementRate: 12.4,
    },
  })
})

analyticsRoutes.get('/trending', authenticate, async (req, res) => {
  res.json({
    success: true,
    data: {
      topHashtags: ['fitness', 'morningroutine', 'productivity', 'aitools', 'creator'],
      topFormats: ['Reel', 'Carousel', 'Short-form Video'],
      bestPostingTimes: [
        { day: 'Monday', times: ['7:00 AM', '12:00 PM', '6:00 PM'] },
        { day: 'Wednesday', times: ['8:00 AM', '6:00 PM'] },
        { day: 'Friday', times: ['9:00 AM', '5:00 PM'] },
      ],
    },
  })
})
