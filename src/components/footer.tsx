'use client'

import { Brain, Mail, Github, Twitter, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = [
  {
    title: 'Game',
    links: [
      { name: 'Play Now', href: '#play' },
      { name: 'Categories', href: '#features' },
      { name: 'Leaderboard', href: '#leaderboard' },
      { name: 'How to Play', href: '#about' }
    ]
  },
  {
    title: 'Features',
    links: [
      { name: 'Educational Content', href: '#features' },
      { name: 'Global Rankings', href: '#leaderboard' },
      { name: 'Timed Challenges', href: '#features' },
      { name: 'Streak System', href: '#features' }
    ]
  },
  {
    title: 'Community',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Mission', href: '#about' },
      { name: 'Statistics', href: '#home' },
      { name: 'Contact', href: '#about' }
    ]
  }
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: Globe, href: '#', label: 'Website' }
]

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">QuizMaster Pro</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming education into an exciting adventure. Learn, play, and grow with our 
              innovative educational gaming platform.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-5 h-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 QuizMaster Pro. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for learners worldwide.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>No login required</span>
              <span>•</span>
              <span>Completely free</span>
              <span>•</span>
              <span>Play instantly</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}