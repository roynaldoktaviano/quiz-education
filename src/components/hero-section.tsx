'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Trophy, Zap, Star, ArrowRight, Play, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Active Players', value: '10,000+', icon: Users },
  { label: 'Questions Answered', value: '1M+', icon: Brain },
  { label: 'Categories', value: '6', icon: Star },
  { label: 'Avg. Score', value: '850', icon: Trophy }
]

export function HeroSection() {
  const scrollToPlay = () => {
    const element = document.getElementById('play')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Game Edukatif</span>
            <Star className="w-4 h-4" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Asah Otakmu,
            </span>
            <br />
            <span className="text-gray-800">Raih Skor Tertinggi!</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Selami dunia quiz edukatif yang seru dan interaktif! Tantang dirimu dengan berbagai pertanyaan menarik dari berbagai kategori, asah kemampuan berpikir kritis dan cepat, serta raih skor tertinggi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToPlay}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2" />
              Mulai Bermain
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => {
                const element = document.getElementById('leaderboard')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              variant="outline"
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Lihat Rankings
            </Button>
          </div>

          {/* Stats Cards */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div> */}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute top-40 right-10 animate-pulse">
          <div className="w-14 h-14 bg-green-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-7 h-7 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 bg-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}