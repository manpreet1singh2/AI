import axios from 'axios'
import { logger } from '../../utils/logger'

// ============ TYPES ============
export interface PostPayload {
  caption: string
  hashtags?: string[]
  mediaUrls?: string[]
  thumbnailUrl?: string
  platform: string
  accessToken: string
  refreshToken?: string
  accountId: string
  metadata?: Record<string, any>
}

export interface PublishResult {
  success: boolean
  platformPostId?: string
  url?: string
  error?: string
}

// ============ INSTAGRAM ============
export class InstagramPublisher {
  private readonly graphUrl = 'https://graph.facebook.com/v20.0'

  async publishPhoto(payload: PostPayload): Promise<PublishResult> {
    try {
      const { caption, hashtags = [], mediaUrls = [], accessToken, accountId } = payload
      const fullCaption = `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`

      // Step 1: Create media container
      const containerRes = await axios.post(
        `${this.graphUrl}/${accountId}/media`,
        {
          image_url: mediaUrls[0],
          caption: fullCaption,
          access_token: accessToken,
        }
      )
      const containerId = containerRes.data.id

      // Step 2: Publish
      const publishRes = await axios.post(
        `${this.graphUrl}/${accountId}/media_publish`,
        { creation_id: containerId, access_token: accessToken }
      )

      return { success: true, platformPostId: publishRes.data.id }
    } catch (error: any) {
      logger.error('Instagram publish failed:', error.response?.data || error.message)
      return { success: false, error: error.response?.data?.error?.message || error.message }
    }
  }

  async publishReel(payload: PostPayload): Promise<PublishResult> {
    try {
      const { caption, hashtags = [], mediaUrls = [], accessToken, accountId } = payload
      const fullCaption = `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`

      const containerRes = await axios.post(
        `${this.graphUrl}/${accountId}/media`,
        {
          media_type: 'REELS',
          video_url: mediaUrls[0],
          caption: fullCaption,
          share_to_feed: true,
          access_token: accessToken,
        }
      )

      // Poll for processing
      await this.waitForMedia(containerRes.data.id, accessToken)

      const publishRes = await axios.post(
        `${this.graphUrl}/${accountId}/media_publish`,
        { creation_id: containerRes.data.id, access_token: accessToken }
      )

      return { success: true, platformPostId: publishRes.data.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  private async waitForMedia(containerId: string, token: string, maxRetries = 10): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      const res = await axios.get(`https://graph.facebook.com/v20.0/${containerId}`, {
        params: { fields: 'status_code', access_token: token },
      })
      if (res.data.status_code === 'FINISHED') return
      if (res.data.status_code === 'ERROR') throw new Error('Media processing failed')
      await new Promise(r => setTimeout(r, 3000))
    }
    throw new Error('Media processing timeout')
  }
}

// ============ TWITTER / X ============
export class TwitterPublisher {
  private readonly apiUrl = 'https://api.twitter.com/2'

  async publishTweet(payload: PostPayload): Promise<PublishResult> {
    try {
      const { caption, hashtags = [], mediaUrls = [], accessToken } = payload
      const hashtagText = hashtags.slice(0, 3).map(h => `#${h}`).join(' ')
      const text = `${caption} ${hashtagText}`.slice(0, 280)

      const body: any = { text }

      // Upload media if provided
      if (mediaUrls.length > 0) {
        const mediaIds = await this.uploadMedia(mediaUrls, accessToken)
        if (mediaIds.length > 0) {
          body.media = { media_ids: mediaIds }
        }
      }

      const response = await axios.post(`${this.apiUrl}/tweets`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      return {
        success: true,
        platformPostId: response.data.data.id,
        url: `https://twitter.com/i/web/status/${response.data.data.id}`,
      }
    } catch (error: any) {
      return { success: false, error: error.response?.data?.detail || error.message }
    }
  }

  private async uploadMedia(urls: string[], token: string): Promise<string[]> {
    const ids: string[] = []
    for (const url of urls.slice(0, 4)) {
      try {
        const imageData = await axios.get(url, { responseType: 'arraybuffer' })
        const b64 = Buffer.from(imageData.data).toString('base64')

        const uploadRes = await axios.post(
          'https://upload.twitter.com/1.1/media/upload.json',
          `media_data=${encodeURIComponent(b64)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        ids.push(uploadRes.data.media_id_string)
      } catch (err) {
        logger.warn('Twitter media upload failed:', err)
      }
    }
    return ids
  }
}

// ============ LINKEDIN ============
export class LinkedInPublisher {
  private readonly apiUrl = 'https://api.linkedin.com/v2'

  async publishPost(payload: PostPayload): Promise<PublishResult> {
    try {
      const { caption, hashtags = [], mediaUrls = [], accessToken, accountId } = payload
      const hashtagText = hashtags.slice(0, 5).map(h => `#${h}`).join(' ')

      const body: any = {
        author: `urn:li:person:${accountId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: `${caption}\n\n${hashtagText}` },
            shareMediaCategory: mediaUrls.length ? 'IMAGE' : 'NONE',
          },
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
      }

      if (mediaUrls.length > 0) {
        const mediaAssets = await this.uploadMedia(mediaUrls, accessToken, accountId)
        body.specificContent['com.linkedin.ugc.ShareContent'].media = mediaAssets
      }

      const response = await axios.post(`${this.apiUrl}/ugcPosts`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
      })

      return { success: true, platformPostId: response.headers['x-restli-id'] }
    } catch (error: any) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  }

  private async uploadMedia(urls: string[], token: string, authorId: string): Promise<any[]> {
    const assets = []
    for (const url of urls.slice(0, 1)) {
      try {
        // Register upload
        const registerRes = await axios.post(
          `${this.apiUrl}/assets?action=registerUpload`,
          {
            registerUploadRequest: {
              recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
              owner: `urn:li:person:${authorId}`,
              serviceRelationships: [{
                relationshipType: 'OWNER',
                identifier: 'urn:li:userGeneratedContent',
              }],
            },
          },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        )

        const uploadUrl = registerRes.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl
        const asset = registerRes.data.value.asset

        // Upload image
        const imageData = await axios.get(url, { responseType: 'arraybuffer' })
        await axios.put(uploadUrl, imageData.data, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/jpeg' },
        })

        assets.push({
          status: 'READY_FOR_UPLOAD',
          description: { text: '' },
          media: asset,
          title: { text: '' },
        })
      } catch (err) {
        logger.warn('LinkedIn media upload failed:', err)
      }
    }
    return assets
  }
}

// ============ YOUTUBE ============
export class YouTubePublisher {
  private readonly apiUrl = 'https://www.googleapis.com/youtube/v3'
  private readonly uploadUrl = 'https://www.googleapis.com/upload/youtube/v3'

  async publishVideo(payload: PostPayload): Promise<PublishResult> {
    try {
      const { caption, hashtags = [], mediaUrls = [], thumbnailUrl, accessToken, metadata } = payload

      const videoData = await axios.get(mediaUrls[0], { responseType: 'stream' })

      const uploadRes = await axios.post(
        `${this.uploadUrl}/videos?uploadType=multipart&part=snippet,status`,
        {
          snippet: {
            title: metadata?.title || caption.slice(0, 100),
            description: `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`,
            tags: hashtags,
            categoryId: metadata?.categoryId || '22',
          },
          status: {
            privacyStatus: metadata?.privacy || 'public',
            selfDeclaredMadeForKids: false,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return { success: true, platformPostId: uploadRes.data.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}

// ============ PUBLISHER FACTORY ============
export class SocialPublisherFactory {
  static getPublisher(platform: string) {
    switch (platform.toUpperCase()) {
      case 'INSTAGRAM': return new InstagramPublisher()
      case 'TWITTER': return new TwitterPublisher()
      case 'LINKEDIN': return new LinkedInPublisher()
      case 'YOUTUBE': return new YouTubePublisher()
      default: throw new Error(`Unsupported platform: ${platform}`)
    }
  }

  static async publish(payload: PostPayload): Promise<PublishResult> {
    const publisher = this.getPublisher(payload.platform)

    switch (payload.platform.toUpperCase()) {
      case 'INSTAGRAM':
        const ig = publisher as InstagramPublisher
        return payload.metadata?.contentType === 'REEL'
          ? ig.publishReel(payload)
          : ig.publishPhoto(payload)
      case 'TWITTER':
        return (publisher as TwitterPublisher).publishTweet(payload)
      case 'LINKEDIN':
        return (publisher as LinkedInPublisher).publishPost(payload)
      case 'YOUTUBE':
        return (publisher as YouTubePublisher).publishVideo(payload)
      default:
        return { success: false, error: 'Platform not supported' }
    }
  }
}
