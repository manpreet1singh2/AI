import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const period = searchParams.get('period') || '30d'

  return NextResponse.json({
    success: true,
    data: {
      totalReach: 3200000,
      avgEngagement: 9.4,
      totalFollowers: 152400,
      followerGrowth: 28400,
      contentPublished: 142,
      period,
      platforms: [
        { platform: 'instagram', reach: 1200000, engagement: 12.4, followers: 84000, growth: '+24%' },
        { platform: 'youtube', reach: 840000, engagement: 8.2, followers: 38000, growth: '+18%' },
        { platform: 'tiktok', reach: 1160000, engagement: 14.1, followers: 30400, growth: '+56%' },
      ],
    },
  })
}
