'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Clock, Target, Brain, BookOpen, Code, Palette, Globe, Star, Zap, Award, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { leaderboardUtils, type LeaderboardEntry } from '@/lib/leaderboard'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

interface GameStats {
  score: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  streak: number
}

const categories = [
  { id: 'science', name: 'Science', icon: Brain, color: 'bg-gray-700' },
  { id: 'math', name: 'Mathematics', icon: Target, color: 'bg-gray-600' },
  { id: 'history', name: 'History', icon: BookOpen, color: 'bg-gray-800' },
  { id: 'programming', name: 'Programming', icon: Code, color: 'bg-gray-700' },
  { id: 'art', name: 'Art & Design', icon: Palette, color: 'bg-gray-600' },
  { id: 'geography', name: 'Geography', icon: Globe, color: 'bg-gray-800' }
]

const sampleQuestions: Question[] = [
  {
    id: 1,
    category: 'science',
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 2,
    category: 'math',
    question: 'What is 15 × 8?',
    options: ['120', '100', '140', '160'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 3,
    category: 'history',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
    difficulty: 'medium',
    points: 20
  },
  {
    id: 4,
    category: 'programming',
    question: 'Which language is known as the "language of the web"?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 5,
    category: 'art',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  }
]

const sampleLeaderboard: LeaderboardEntry[] = []

export default function Home() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results' | 'leaderboard'>('menu')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
    streak: 0
  })
  const [timeLeft, setTimeLeft] = useState(30)
  const [showResult, setShowResult] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(sampleLeaderboard)
  const [playerName, setPlayerName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    setLeaderboard(leaderboardUtils.getLeaderboard())
  }, [])

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(selectedAnswer ?? -1)
    }
  }, [timeLeft, gameState, showResult])

  const fetchQuestions = async (categoryId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/questions?category=${categoryId}&limit=5`)
      const data = await response.json()
      if (data.success) {
        setQuestions(data.data)
      } else {
        // Fallback to sample questions
        const categoryQuestions = sampleQuestions.filter(q => q.category === categoryId)
        setQuestions(categoryQuestions.length > 0 ? categoryQuestions : sampleQuestions)
      }
    } catch (error) {
      // Fallback to sample questions
      const categoryQuestions = sampleQuestions.filter(q => q.category === categoryId)
      setQuestions(categoryQuestions.length > 0 ? categoryQuestions : sampleQuestions)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshLeaderboard = () => {
    setLeaderboard(leaderboardUtils.getLeaderboard())
  }

  const startGame = async (categoryId: string) => {
    setSelectedCategory(categoryId)
    await fetchQuestions(categoryId)
    setGameState('playing')
    setCurrentQuestionIndex(0)
    setGameStats({
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeSpent: 0,
      streak: 0
    })
    setTimeLeft(30)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    
    setGameStats(prev => ({
      ...prev,
      score: isCorrect ? prev.score + currentQuestion.points : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalQuestions: prev.totalQuestions + 1,
      streak: isCorrect ? prev.streak + 1 : 0
    }))
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeLeft(30)
      } else {
        endGame()
      }
    }, 2000)
  }

  const endGame = () => {
    setGameState('results')
  }

  const saveToLeaderboard = () => {
    if (!playerName.trim()) return
    
    try {
      const updatedLeaderboard = leaderboardUtils.saveEntry(
        playerName,
        gameStats.score,
        categories.find(c => c.id === selectedCategory)?.name || 'Mixed'
      )
      
      setLeaderboard(updatedLeaderboard)
      setGameState('leaderboard')
    } catch (error) {
      console.error('Failed to save score:', error)
      // Fallback to local state
      const newEntry: LeaderboardEntry = {
        rank: leaderboard.length + 1,
        name: playerName,
        score: gameStats.score,
        category: categories.find(c => c.id === selectedCategory)?.name || 'Mixed',
        timestamp: new Date().toISOString()
      }
      
      const updatedLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((entry, index) => ({ ...entry, rank: index + 1 }))
      
      setLeaderboard(updatedLeaderboard)
      setGameState('leaderboard')
    }
  }

  const resetGame = () => {
    setGameState('menu')
    setSelectedCategory(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setGameStats({
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      timeSpent: 0,
      streak: 0
    })
    setTimeLeft(30)
    setShowResult(false)
    setPlayerName('')
    // Refresh leaderboard when returning to menu
    refreshLeaderboard()
  }

  const currentQuestion = questions[currentQuestionIndex]

  // Main website view
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen">
        <Navigation />
        <HeroSection />
        
        {/* Play Section */}
        <section id="play" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 bg-gray-100 text-gray-700">
                Choose Your Challenge
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gray-800">
                  Select a Category
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pick your favorite subject and start learning through play!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-3">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800">{category.name}</CardTitle>
                      <CardDescription>Test your {category.name.toLowerCase()} knowledge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => startGame(category.id)}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                      >
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <FeaturesSection />
        <AboutSection />
        
        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-4 px-4 py-2 bg-gray-100 text-gray-700">
                Rankings
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gray-800">
                  Global Leaderboard
                </span>
              </h2>
              <p className="text-xl text-gray-600">Top performers across all categories</p>
            </div>

            <div className="grid gap-4 mb-8">
              {leaderboard.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-500">No scores yet. Be the first to play!</p>
                    <Button 
                      onClick={() => {
                        const element = document.getElementById('play')
                        if (element) element.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="mt-4 bg-gray-800 hover:bg-gray-900"
                    >
                      Start Playing
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                leaderboard.map((entry) => (
                  <Card key={entry.rank} className={cn(
                    "bg-white/90 backdrop-blur-sm border-0 transition-all duration-300 hover:shadow-lg",
                    entry.rank === 1 && "ring-2 ring-gray-400 bg-gray-50",
                    entry.rank === 2 && "ring-2 ring-gray-300 bg-gray-100",
                    entry.rank === 3 && "ring-2 ring-gray-200 bg-white"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                            entry.rank === 1 && "bg-gray-800",
                            entry.rank === 2 && "bg-gray-700",
                            entry.rank === 3 && "bg-gray-600",
                            entry.rank > 3 && "bg-gray-500"
                          )}>
                            {entry.rank}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{entry.name}</p>
                            <p className="text-sm text-gray-500">{entry.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">{entry.score}</p>
                          <p className="text-xs text-gray-500">points</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // Game view (existing game logic)
  if (gameState === 'playing' && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Loading questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === 'playing' && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Navigation />
        <div className="max-w-4xl mx-auto pt-24">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {categories.find(c => c.id === currentQuestion.category)?.name}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-700">{gameStats.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={cn("w-5 h-5", timeLeft <= 10 ? "text-red-500" : "text-gray-500")} />
                  <span className={cn("font-semibold", timeLeft <= 10 ? "text-red-500" : "text-gray-700")}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold text-gray-700">{gameStats.streak}</span>
                </div>
              </div>
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
            <p className="text-sm text-gray-500 mt-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                {currentQuestion.question}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {currentQuestion.points} points
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer
                const isSelected = index === selectedAnswer
                
                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 text-left justify-start h-auto py-4 px-6 rounded-xl transition-all duration-300 font-medium",
                      showResult && isCorrect && "bg-gray-700 hover:bg-gray-700 text-white",
                      showResult && isSelected && !isCorrect && "bg-gray-400 hover:bg-gray-400 text-white",
                      !showResult && "bg-gray-50 hover:bg-gray-100 hover:border-gray-300 border-2 border-gray-200 text-gray-700"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{option}</span>
                      {showResult && isCorrect && <Award className="w-5 h-5" />}
                      {showResult && isSelected && !isCorrect && <span className="text-sm">✗</span>}
                    </div>
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === 'results') {
    const accuracy = gameStats.totalQuestions > 0 
      ? Math.round((gameStats.correctAnswers / gameStats.totalQuestions) * 100)
      : 0

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-black mb-2">Quiz Complete!</h1>
              <p className="text-gray-600">Here's how you performed</p>
            </div>

            {/* Results Card */}
            <div className="bg-white border-2 border-black rounded-lg p-8 shadow-xl">
              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-black mb-2">{gameStats.score}</div>
                <div className="text-lg text-gray-600">Total Points</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 border border-gray-300 rounded">
                  <div className="text-2xl font-bold text-black">{accuracy}%</div>
                  <div className="text-xs text-gray-600 mt-1">Accuracy</div>
                </div>
                <div className="text-center p-4 bg-gray-50 border border-gray-300 rounded">
                  <div className="text-2xl font-bold text-black">{gameStats.correctAnswers}/{gameStats.totalQuestions}</div>
                  <div className="text-xs text-gray-600 mt-1">Correct</div>
                </div>
                <div className="text-center p-4 bg-gray-50 border border-gray-300 rounded">
                  <div className="text-2xl font-bold text-black">{gameStats.streak}</div>
                  <div className="text-xs text-gray-600 mt-1">Best Streak</div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 mb-6"></div>

              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name for the leaderboard"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  maxLength={20}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={saveToLeaderboard}
                  disabled={!playerName.trim()}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Save to Leaderboard
                </Button>
                <Button 
                  onClick={resetGame}
                  variant="outline"
                  className="w-full border border-gray-300 text-black py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Play Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Navigation />
        <div className="max-w-4xl mx-auto pt-24">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-10 h-10 text-gray-600" />
              <h1 className="text-4xl font-bold text-gray-800">
                Leaderboard
              </h1>
            </div>
            <p className="text-gray-600">Top performers across all categories</p>
          </div>

          <div className="grid gap-4 mb-8">
            {leaderboard.map((entry) => (
              <Card key={entry.rank} className={cn(
                "bg-white/90 backdrop-blur-sm border-0 transition-all duration-300 hover:shadow-lg",
                entry.rank === 1 && "ring-2 ring-gray-400 bg-gray-50",
                entry.rank === 2 && "ring-2 ring-gray-300 bg-gray-100",
                entry.rank === 3 && "ring-2 ring-gray-200 bg-white"
              )}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white",
                        entry.rank === 1 && "bg-gray-800",
                        entry.rank === 2 && "bg-gray-700",
                        entry.rank === 3 && "bg-gray-600",
                        entry.rank > 3 && "bg-gray-500"
                      )}>
                        {entry.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{entry.name}</p>
                        <p className="text-sm text-gray-500">{entry.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">{entry.score}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={resetGame}
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Play Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}