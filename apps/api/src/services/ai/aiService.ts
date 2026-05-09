import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'
import axios from 'axios'
import { logger } from '../utils/logger'

// ============ CLIENTS ============
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-Title': 'Aura AI SaaS',
  },
})

const gemini = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

// ============ TYPES ============
export interface ContentGenerationOptions {
  prompt: string
  platform: string
  tone?: string
  contentType?: string
  brand?: {
    name?: string
    toneOfVoice?: string[]
    guidelines?: string
  }
  count?: number
}

export interface GeneratedContent {
  caption: string
  hashtags: string[]
  script?: string
  hook?: string
  cta?: string
  seoTitle?: string
  description?: string
}

export interface ImageGenerationOptions {
  prompt: string
  style?: string
  aspectRatio?: '1:1' | '9:16' | '16:9' | '4:5'
  count?: number
}

// ============ TEXT GENERATION ============
export class AIContentService {

  // Generate captions, scripts, hashtags
  async generateContent(options: ContentGenerationOptions): Promise<GeneratedContent[]> {
    const { prompt, platform, tone = 'viral', contentType = 'post', brand, count = 1 } = options

    const brandContext = brand
      ? `Brand: ${brand.name}. Tone: ${brand.toneOfVoice?.join(', ')}. Guidelines: ${brand.guidelines}`
      : ''

    const systemPrompt = `You are an elite social media content strategist and viral content creator.
You specialize in creating highly engaging, platform-optimized content that drives massive reach.
${brandContext}

Platform: ${platform}
Tone: ${tone}
Content Type: ${contentType}

Rules:
- Write captions that STOP the scroll in the first line
- Use platform-specific best practices
- Include powerful hooks and CTAs
- Generate trending, relevant hashtags
- Keep scripts engaging with pattern interrupts

Respond ONLY with valid JSON array.`

    const userPrompt = `Generate ${count} unique ${platform} ${contentType}(s) for: "${prompt}"

Return JSON array with exactly ${count} objects:
[{
  "caption": "full caption with emojis and line breaks",
  "hashtags": ["tag1", "tag2", ...30 tags],
  "hook": "attention-grabbing first line",
  "cta": "call to action",
  "script": "full video script if applicable",
  "seoTitle": "SEO-optimized title",
  "description": "platform description"
}]`

    try {
      // Try OpenRouter first (more models)
      const response = await openrouter.chat.completions.create({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 4096,
        response_format: { type: 'json_object' },
      })

      const text = response.choices[0]?.message?.content || '[]'
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? parsed : (parsed.content || parsed.posts || [parsed])

    } catch (orError) {
      logger.warn('OpenRouter failed, falling back to Gemini:', orError)

      // Fallback to Gemini
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
        const result = await model.generateContent(
          `${systemPrompt}\n\n${userPrompt}\n\nReturn only valid JSON.`
        )
        const text = result.response.text()
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) return JSON.parse(jsonMatch[0])
        return []
      } catch (geminiError) {
        logger.error('Both AI providers failed:', geminiError)
        throw new Error('Content generation failed')
      }
    }
  }

  // Generate hashtags specifically
  async generateHashtags(topic: string, platform: string, count = 30): Promise<string[]> {
    try {
      const response = await openrouter.chat.completions.create({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [{
          role: 'user',
          content: `Generate ${count} trending, viral hashtags for "${topic}" on ${platform}.
Mix of: popular (10M+ posts), mid-range (1-10M), niche (under 1M).
Return ONLY a JSON array of strings: ["hashtag1", "hashtag2", ...]
No # prefix needed.`,
        }],
        max_tokens: 500,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      })
      const text = response.choices[0]?.message?.content || '[]'
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? parsed : (parsed.hashtags || [])
    } catch (error) {
      logger.error('Hashtag generation failed:', error)
      return []
    }
  }

  // Generate viral hook variations
  async generateHooks(topic: string, count = 5): Promise<string[]> {
    try {
      const response = await openrouter.chat.completions.create({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [{
          role: 'user',
          content: `Generate ${count} ultra-viral opening hooks for content about "${topic}".
Each hook should: stop the scroll, create curiosity, be under 15 words.
Use techniques: shocking stats, controversy, "nobody talks about", "I made $X", etc.
Return JSON: {"hooks": ["hook1", "hook2", ...]}`,
        }],
        max_tokens: 500,
        temperature: 0.9,
        response_format: { type: 'json_object' },
      })
      const text = response.choices[0]?.message?.content || '{}'
      const parsed = JSON.parse(text)
      return parsed.hooks || []
    } catch (error) {
      logger.error('Hook generation failed:', error)
      return []
    }
  }

  // Score content virality
  async scoreContent(content: string, platform: string): Promise<{
    score: number
    analysis: string
    improvements: string[]
  }> {
    try {
      const response = await openrouter.chat.completions.create({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [{
          role: 'user',
          content: `As a viral content expert, score this ${platform} content (0-100) and provide analysis.

Content: "${content}"

Return JSON: {
  "score": 0-100,
  "analysis": "why it will/won't perform",
  "improvements": ["improvement1", "improvement2", "improvement3"]
}`,
        }],
        max_tokens: 600,
        temperature: 0.3,
        response_format: { type: 'json_object' },
      })
      const text = response.choices[0]?.message?.content || '{}'
      return JSON.parse(text)
    } catch (error) {
      logger.error('Content scoring failed:', error)
      return { score: 0, analysis: 'Scoring unavailable', improvements: [] }
    }
  }
}

// ============ IMAGE GENERATION ============
export class AIImageService {

  async generateImage(options: ImageGenerationOptions): Promise<string[]> {
    const { prompt, style = 'photorealistic', aspectRatio = '1:1', count = 1 } = options

    const sizeMap: Record<string, '1024x1024' | '1792x1024' | '1024x1792'> = {
      '1:1': '1024x1024',
      '16:9': '1792x1024',
      '9:16': '1024x1792',
      '4:5': '1024x1024',
    }

    const enhancedPrompt = `${prompt}, ${style} style, professional quality, high resolution, masterpiece`

    try {
      // Try DALL-E 3 first
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1, // DALL-E 3 only supports n=1
        size: sizeMap[aspectRatio] || '1024x1024',
        quality: 'hd',
        style: 'vivid',
      })
      return response.data.map(img => img.url || '').filter(Boolean)

    } catch (error: any) {
      logger.warn('DALL-E 3 failed, trying Stable Diffusion:', error.message)

      // Fallback: Stability AI via their API
      try {
        const response = await axios.post(
          'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
          {
            text_prompts: [
              { text: enhancedPrompt, weight: 1 },
              { text: 'blurry, low quality, distorted', weight: -1 },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            samples: count,
            steps: 30,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
              Accept: 'application/json',
            },
          }
        )

        return response.data.artifacts.map((a: any) =>
          `data:image/png;base64,${a.base64}`
        )
      } catch (sdError) {
        logger.error('Image generation completely failed:', sdError)
        throw new Error('Image generation unavailable')
      }
    }
  }

  async generateThumbnail(title: string, style: string): Promise<string> {
    const thumbnailPrompt = `YouTube/social media thumbnail for "${title}". 
Style: ${style}. Bold text overlay space. Bright colors. High contrast. 
Professional thumbnail design. Eye-catching. Click-worthy.`

    const urls = await this.generateImage({
      prompt: thumbnailPrompt,
      style,
      aspectRatio: '16:9',
      count: 1,
    })
    return urls[0] || ''
  }
}

// ============ VOICE GENERATION ============
export class AIVoiceService {

  async generateVoiceover(text: string, voiceId?: string): Promise<Buffer> {
    const VOICE_ID = voiceId || 'pNInz6obpgDQGcFmaJgB' // ElevenLabs Adam

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        text,
        model_id: 'eleven_turbo_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true,
        },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        responseType: 'arraybuffer',
      }
    )

    return Buffer.from(response.data)
  }

  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const { Readable } = require('stream')

    // Use Whisper via OpenAI
    const transcription = await openai.audio.transcriptions.create({
      file: new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' }),
      model: 'whisper-1',
      response_format: 'text',
    })

    return typeof transcription === 'string' ? transcription : (transcription as any).text
  }
}

// Singleton instances
export const aiContentService = new AIContentService()
export const aiImageService = new AIImageService()
export const aiVoiceService = new AIVoiceService()
