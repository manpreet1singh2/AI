import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, platform, tone, contentType, count = 1 } = body

    if (!prompt || !platform) {
      return NextResponse.json({ success: false, error: 'prompt and platform are required' }, { status: 400 })
    }

    // Try Anthropic Claude first
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (anthropicKey) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 2048,
            messages: [{
              role: 'user',
              content: `Generate ${count} ${tone || 'viral'} ${platform} ${contentType || 'post'}(s) for: "${prompt}". Return ONLY a valid JSON array with objects containing: caption, hashtags (array of strings), hook, cta, script fields.`,
            }],
          }),
        })
        const data = await res.json()
        const text = data.content?.[0]?.text || '[]'
        const jsonMatch = text.match(/\[[\s\S]*\]/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          return NextResponse.json({ success: true, data: parsed, count: parsed.length })
        }
      } catch {}
    }

    // Demo fallback
    const fallback = Array.from({ length: Math.min(count, 5) }, (_, i) => ({
      hook: `🔥 This ${platform} secret changes everything about "${prompt}"`,
      caption: `The ${tone || 'viral'} approach to ${prompt} that nobody is talking about.\n\n✅ Proven strategy\n✅ Real results\n✅ Zero fluff\n\nSave this. Your future self will thank you. 💪\n\nWhat's your biggest challenge with this? 👇`,
      hashtags: [platform.toLowerCase(), contentType || 'post', tone || 'viral', 'content', 'creator', 'growth', 'viral', 'trending', 'socialmedia', 'marketing'],
      cta: 'Save this post and share with someone who needs this!',
      script: 'HOOK (0-3s): Bold opening statement\nBODY (3-45s): Core value delivery\nCTA (45-60s): Follow + save ask',
    }))

    return NextResponse.json({ success: true, data: fallback, count: fallback.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
