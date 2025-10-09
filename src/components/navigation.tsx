'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Brain, Menu, X, Trophy, BookOpen, Home, Info, Star, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: Home,
    description: 'Welcome to QuizMaster Pro'
  },
  {
    label: 'Play',
    href: '#play',
    icon: Brain,
    description: 'Start learning now'
  },
  {
    label: 'Leaderboard',
    href: '#leaderboard',
    icon: Trophy,
    description: 'Top performers'
  },
  {
    label: 'Features',
    href: '#features',
    icon: Star,
    description: 'What makes us special'
  },
  {
    label: 'About',
    href: '#about',
    icon: Info,
    description: 'Our educational mission'
  }
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsOpen(false)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              QuizMaster Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={activeSection === item.href.slice(1) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className="gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    QuizMaster Pro
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.href}
                      variant={activeSection === item.href.slice(1) ? "secondary" : "ghost"}
                      size="lg"
                      onClick={() => scrollToSection(item.href.slice(1))}
                      className="w-full justify-start gap-3 p-4 rounded-xl transition-all duration-200"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{item.label}</div>
                        {item.description && (
                          <div className="text-sm text-gray-500">{item.description}</div>
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900">Join thousands of learners!</span>
                </div>
                <p className="text-sm text-purple-700">
                  Start your educational journey today and compete with students worldwide.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}