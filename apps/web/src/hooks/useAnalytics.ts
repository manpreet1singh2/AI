'use client'

import { useQuery } from '@tanstack/react-query'

export function useAnalyticsOverview(period: string = '30d') {
  return useQuery({
    queryKey: ['analytics', 'overview', period],
    queryFn: async () => {
      const res = await fetch(`/api/v1/analytics/overview?period=${period}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')
      const data = await res.json()
      return data.data
    },
    staleTime: 5 * 60 * 1000, // 5 min
  })
}

export function useContentAnalytics(contentId: string) {
  return useQuery({
    queryKey: ['analytics', 'content', contentId],
    queryFn: async () => {
      const res = await fetch(`/api/v1/analytics/content/${contentId}`)
      if (!res.ok) throw new Error('Failed to fetch content analytics')
      const data = await res.json()
      return data.data
    },
    enabled: !!contentId,
  })
}
