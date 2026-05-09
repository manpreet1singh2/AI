import { Metadata } from 'next'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { RecentContent } from '@/components/dashboard/RecentContent'
import { QuickGenerate } from '@/components/dashboard/QuickGenerate'
import { UpcomingPosts } from '@/components/dashboard/UpcomingPosts'
import { PlatformStats } from '@/components/dashboard/PlatformStats'

export const metadata: Metadata = { title: 'Dashboard' }

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Good morning, Creator 👋</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Your content is performing 34% better than last week
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-green-400 font-medium">3 posts publishing today</span>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuickGenerate />
          <RecentContent />
        </div>
        <div className="space-y-6">
          <UpcomingPosts />
          <PlatformStats />
        </div>
      </div>
    </div>
  )
}
