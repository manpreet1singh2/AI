// ============================================
// AURA AI - ZUSTAND GLOBAL STATE
// ============================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ---- UI STORE ----
interface UIState {
  sidebarCollapsed: boolean
  activeWorkspaceId: string | null
  setSidebarCollapsed: (v: boolean) => void
  setActiveWorkspaceId: (id: string | null) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      activeWorkspaceId: null,
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),
    }),
    { name: 'aura-ui' }
  )
)

// ---- CONTENT GENERATION STORE ----
export interface GeneratedContent {
  caption: string
  hashtags: string[]
  hook?: string
  cta?: string
  script?: string
}

interface ContentStore {
  prompt: string
  platform: string
  tone: string
  contentType: string
  count: number
  results: GeneratedContent[]
  selectedResult: number
  generating: boolean
  setPrompt: (v: string) => void
  setPlatform: (v: string) => void
  setTone: (v: string) => void
  setContentType: (v: string) => void
  setCount: (v: number) => void
  setResults: (results: GeneratedContent[]) => void
  setSelectedResult: (i: number) => void
  setGenerating: (v: boolean) => void
  reset: () => void
}

export const useContentStore = create<ContentStore>((set) => ({
  prompt: '',
  platform: 'Instagram',
  tone: 'Viral',
  contentType: 'Reel',
  count: 3,
  results: [],
  selectedResult: 0,
  generating: false,
  setPrompt: (v) => set({ prompt: v }),
  setPlatform: (v) => set({ platform: v }),
  setTone: (v) => set({ tone: v }),
  setContentType: (v) => set({ contentType: v }),
  setCount: (v) => set({ count: v }),
  setResults: (results) => set({ results, selectedResult: 0 }),
  setSelectedResult: (i) => set({ selectedResult: i }),
  setGenerating: (v) => set({ generating: v }),
  reset: () => set({ prompt: '', results: [], selectedResult: 0, generating: false }),
}))

// ---- BRAND STORE ----
interface BrandState {
  brandName: string
  tagline: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  tone: string
  guidelines: string
  setBrand: (partial: Partial<Omit<BrandState, 'setBrand'>>) => void
}

export const useBrandStore = create<BrandState>()(
  persist(
    (set) => ({
      brandName: '',
      tagline: '',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      fontFamily: 'Syne',
      tone: 'Professional',
      guidelines: '',
      setBrand: (partial) => set((state) => ({ ...state, ...partial })),
    }),
    { name: 'aura-brand' }
  )
)

// ---- NOTIFICATIONS STORE ----
interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  read: boolean
  createdAt: string
}

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  clear: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (n) => {
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      ...n,
      read: false,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 50),
      unreadCount: state.unreadCount + 1,
    }))
  },
  markRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  markAllRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  clear: () => set({ notifications: [], unreadCount: 0 }),
}))
