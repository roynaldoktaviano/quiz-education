import { NextRequest, NextResponse } from 'next/server'

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  category: string
  timestamp: string
}

// In-memory storage for demo purposes
// In production, you'd use a database
let leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Chen', score: 2500, category: 'Science', timestamp: new Date().toISOString() },
  { rank: 2, name: 'Sarah Johnson', score: 2350, category: 'Mathematics', timestamp: new Date().toISOString() },
  { rank: 3, name: 'Mike Davis', score: 2200, category: 'Programming', timestamp: new Date().toISOString() },
  { rank: 4, name: 'Emma Wilson', score: 2100, category: 'History', timestamp: new Date().toISOString() },
  { rank: 5, name: 'James Brown', score: 1950, category: 'Art & Design', timestamp: new Date().toISOString() }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: leaderboard
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, score, category } = body

    if (!name || !score || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newEntry: LeaderboardEntry = {
      rank: leaderboard.length + 1,
      name: name.trim(),
      score: Number(score),
      category,
      timestamp: new Date().toISOString()
    }

    leaderboard.push(newEntry)
    
    // Sort by score and update ranks
    leaderboard.sort((a, b) => b.score - a.score)
    leaderboard = leaderboard.slice(0, 10) // Keep top 10
    leaderboard = leaderboard.map((entry, index) => ({ ...entry, rank: index + 1 }))

    return NextResponse.json({
      success: true,
      data: newEntry,
      leaderboard
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save score' },
      { status: 500 }
    )
  }
}