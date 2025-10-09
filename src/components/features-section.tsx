'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Trophy, Clock, Target, Zap, BookOpen, Globe, Award, Users } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: '6 Educational Categories',
    description: 'Science, Math, History, Programming, Art & Geography',
    color: 'bg-purple-500',
    highlights: ['Expert-curated content', 'Age-appropriate questions', 'Progressive difficulty']
  },
  {
    icon: Trophy,
    title: 'Global Leaderboard',
    description: 'Compete with learners worldwide',
    color: 'bg-yellow-500',
    highlights: ['Real-time rankings', 'Category-specific scores', 'Achievement badges']
  },
  {
    icon: Clock,
    title: 'Timed Challenges',
    description: 'Test your knowledge under pressure',
    color: 'bg-blue-500',
    highlights: ['30-second rounds', 'Bonus points for speed', 'Time management skills']
  },
  {
    icon: Target,
    title: 'Adaptive Difficulty',
    description: 'Questions that match your skill level',
    color: 'bg-green-500',
    highlights: ['Easy, Medium, Hard', 'Personalized learning', 'Skill progression']
  },
  {
    icon: Zap,
    title: 'Streak System',
    description: 'Build momentum with consecutive wins',
    color: 'bg-orange-500',
    highlights: ['Multiplier bonuses', 'Achievement unlocks', 'Daily challenges']
  },
  {
    icon: BookOpen,
    title: 'Learn & Play',
    description: 'Education meets entertainment',
    color: 'bg-pink-500',
    highlights: ['Gamified learning', 'Instant feedback', 'Knowledge retention']
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose QuizMaster Pro?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect blend of education and entertainment with our innovative learning platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {feature.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Join Our Learning Community</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Thousands of students are already improving their knowledge while having fun. 
              Start your journey today and see how far you can go!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Award className="w-4 h-4" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe className="w-4 h-4" />
                <span>Play instantly</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4" />
                <span>Completely free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}