'use client'

import { useState, useCallback } from 'react'

export interface GeneratedContent {
  caption: string
  hashtags: string[]
  hook?: string
  cta?: string
  script?: string
}

interface UseAIOptions {
  onSuccess?: (results: GeneratedContent[]) => void
  onError?: (error: string) => void
}

export function useAIGenerate(options?: UseAIOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<GeneratedContent[]>([])

  const generate = useCallback(async (params: {
    prompt: string
    platform: string
    tone?: string
    contentType?: string
    count?: number
  }) => {
    if (!params.prompt.trim()) return
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const res = await fetch('/api/v1/ai/generate/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.success) {
        setResults(data.data)
        options?.onSuccess?.(data.data)
      } else {
        throw new Error(data.error || 'Generation failed')
      }
    } catch (err: any) {
      const message = err.message || 'Failed to generate content'
      setError(message)
      options?.onError?.(message)
    } finally {
      setLoading(false)
    }
  }, [options])

  const reset = useCallback(() => {
    setResults([])
    setError(null)
    setLoading(false)
  }, [])

  return { generate, loading, error, results, reset }
}

export function useAIScore() {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState<{ score: number; analysis: string; improvements: string[] } | null>(null)

  const scoreContent = useCallback(async (content: string, platform: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/ai/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platform }),
      })
      const data = await res.json()
      if (data.success) setScore(data.data)
    } catch {}
    setLoading(false)
  }, [])

  return { scoreContent, loading, score }
}
