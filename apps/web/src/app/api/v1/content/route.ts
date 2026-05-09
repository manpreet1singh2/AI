import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      { id: '1', title: 'Luxury Fitness Morning Routine', type: 'REEL', platform: 'instagram', status: 'PUBLISHED', views: 124000, createdAt: new Date().toISOString() },
      { id: '2', title: 'Top 5 AI Tools 2026', type: 'SHORT', platform: 'youtube', status: 'SCHEDULED', views: 0, createdAt: new Date().toISOString() },
    ],
    count: 2,
    pagination: { page: 1, pageSize: 20, total: 2, totalPages: 1 },
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json({
    success: true,
    data: { id: `content-${Date.now()}`, ...body, status: 'DRAFT', createdAt: new Date().toISOString() },
  }, { status: 201 })
}
