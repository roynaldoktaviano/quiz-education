'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Target, Users, Lightbulb, Heart, GraduationCap } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Revolutionizing education through gamification',
    color: 'bg-yellow-500'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Driven by the love of learning and teaching',
    color: 'bg-red-500'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Committed to providing the best educational experience',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a global network of learners',
    color: 'bg-green-500'
  }
]

const stats = [
  { number: '95%', label: 'Student Satisfaction' },
  { number: '80%', label: 'Knowledge Retention' },
  { number: '3x', label: 'Faster Learning' },
  { number: '50+', label: 'Countries' }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700">
            About Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Educational Mission
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe learning should be exciting, engaging, and accessible to everyone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Making Learning Fun Again</h3>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                EdukaQuiz was born from a simple idea: what if learning could be as addictive 
                as your favorite game? We've transformed traditional education into an interactive 
                experience that students actually want to engage with.
              </p>
              
              <p>
                Our platform combines cutting-edge educational research with game mechanics to 
                create an environment where knowledge sticks. Whether you're a student looking 
                to supplement your studies or a lifelong learner seeking new challenges, 
                EdukaQuiz adapts to your pace and learning style.
              </p>
              
              <p>
                No logins, no barriers, no complications. Just pure learning fun, available 
                instantly to anyone with curiosity and a desire to grow.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Educational Philosophy */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
          <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Philosophy</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Education should not be a chore but an adventure. By integrating game design principles 
            with proven learning methodologies, we create experiences that not only teach but also 
            inspire. Every question answered is a step toward mastery, every game played is a 
            building block for lifelong learning.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="secondary" className="px-4 py-2">Gamification</Badge>
            <Badge variant="secondary" className="px-4 py-2">Adaptive Learning</Badge>
            <Badge variant="secondary" className="px-4 py-2">Instant Feedback</Badge>
            <Badge variant="secondary" className="px-4 py-2">Global Community</Badge>
          </div>
        </div>
      </div>
    </section>
  )
}