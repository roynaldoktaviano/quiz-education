export interface LeaderboardEntry {
    rank: number
    name: string
    score: number
    category: string
    timestamp: string
  }
  
  const LEADERBOARD_KEY = 'quizmaster-leaderboard'
  const MAX_ENTRIES = 10
  
  export const leaderboardUtils = {
    // Get leaderboard from localStorage
    getLeaderboard(): LeaderboardEntry[] {
      if (typeof window === 'undefined') return []
      
      try {
        const stored = localStorage.getItem(LEADERBOARD_KEY)
        if (!stored) return []
        
        const data = JSON.parse(stored)
        return Array.isArray(data) ? data : []
      } catch (error) {
        console.error('Failed to load leaderboard from localStorage:', error)
        return []
      }
    },
  
    // Save entry to leaderboard
    saveEntry(name: string, score: number, category: string): LeaderboardEntry[] {
      if (typeof window === 'undefined') return []
  
      try {
        const currentLeaderboard = this.getLeaderboard()
        
        const newEntry: LeaderboardEntry = {
          rank: 0, // Will be calculated after sorting
          name: name.trim(),
          score: Number(score),
          category,
          timestamp: new Date().toISOString()
        }
  
        // Add new entry
        currentLeaderboard.push(newEntry)
        
        // Sort by score (descending) and update ranks
        currentLeaderboard.sort((a, b) => b.score - a.score)
        
        // Keep only top entries
        const trimmedLeaderboard = currentLeaderboard.slice(0, MAX_ENTRIES)
        
        // Update ranks
        const rankedLeaderboard = trimmedLeaderboard.map((entry, index) => ({
          ...entry,
          rank: index + 1
        }))
  
        // Save to localStorage
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(rankedLeaderboard))
        
        return rankedLeaderboard
      } catch (error) {
        console.error('Failed to save leaderboard to localStorage:', error)
        return []
      }
    },
  
    // Clear entire leaderboard
    clearLeaderboard(): void {
      if (typeof window === 'undefined') return
      
      try {
        localStorage.removeItem(LEADERBOARD_KEY)
      } catch (error) {
        console.error('Failed to clear leaderboard from localStorage:', error)
      }
    },
  
    // Add a test entry (for development)
    addTestEntry(): void {
      if (typeof window === 'undefined') return
      
      const testNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
      const testCategories = ['Science', 'Mathematics', 'History', 'Programming', 'Art & Design']
      
      const randomName = testNames[Math.floor(Math.random() * testNames.length)]
      const randomCategory = testCategories[Math.floor(Math.random() * testCategories.length)]
      const randomScore = Math.floor(Math.random() * 2000) + 500
      
      this.saveEntry(randomName, randomScore, randomCategory)
    },
  
    // Get top N entries
    getTopEntries(count: number = 10): LeaderboardEntry[] {
      return this.getLeaderboard().slice(0, count)
    },
  
    // Check if score qualifies for leaderboard
    qualifiesForLeaderboard(score: number): boolean {
      const leaderboard = this.getLeaderboard()
      
      if (leaderboard.length < MAX_ENTRIES) return true
      
      const lowestScore = leaderboard[leaderboard.length - 1]?.score || 0
      return score > lowestScore
    },
  
    // Get user's best score
    getBestScore(userName: string): number {
      const leaderboard = this.getLeaderboard()
      const userEntries = leaderboard.filter(entry => 
        entry.name.toLowerCase() === userName.toLowerCase()
      )
      
      if (userEntries.length === 0) return 0
      
      return Math.max(...userEntries.map(entry => entry.score))
    },
  
    // Get user's rank
    getUserRank(userName: string): number | null {
      const leaderboard = this.getLeaderboard()
      const userEntry = leaderboard.find(entry => 
        entry.name.toLowerCase() === userName.toLowerCase()
      )
      
      return userEntry?.rank || null
    }
  }