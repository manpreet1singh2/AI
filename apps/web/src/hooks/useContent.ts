'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useContentList(params?: { platform?: string; status?: string; page?: number }) {
  return useQuery({
    queryKey: ['content', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams()
      if (params?.platform) searchParams.set('platform', params.platform)
      if (params?.status) searchParams.set('status', params.status)
      if (params?.page) searchParams.set('page', params.page.toString())

      const res = await fetch(`/api/v1/content?${searchParams}`)
      if (!res.ok) throw new Error('Failed to fetch content')
      return res.json()
    },
    staleTime: 30 * 1000,
  })
}

export function useCreateContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/v1/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create content')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content'] }),
  })
}

export function useDeleteContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/v1/content/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete content')
      return res.json()
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['content'] }),
  })
}
