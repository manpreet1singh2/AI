export const config = {
  port: parseInt(process.env.PORT || '4000'),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  nodeEnv: process.env.NODE_ENV || 'development',
  openrouterKey: process.env.OPENROUTER_API_KEY || '',
  geminiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
  openaiKey: process.env.OPENAI_API_KEY || '',
  elevenlabsKey: process.env.ELEVENLABS_API_KEY || '',
}
