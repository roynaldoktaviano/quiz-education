'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Target, Users, Lightbulb, Heart, GraduationCap } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Fasilitas Lengkap',
    description: 'Ruang kelas modern, laboratorium, dan perpustakaan yang mendukung belajar aktif.',
    color: 'bg-yellow-500'
  },
  {
    icon: Heart,
    title: 'Ekstrakurikuler Beragam',
    description: 'Dari olahraga, seni, hingga klub sains, semua ada untuk mengembangkan bakatmu.',
    color: 'bg-red-500'
  },
  {
    icon: Target,
    title: 'Guru Profesional & Peduli',
    description: 'Tenaga pengajar berpengalaman yang siap membimbing setiap langkahmu.',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: 'Lingkungan Belajar Menyenangkan',
    description: 'Suasana ramah, aman, dan inspiratif untuk teman-teman SMP yang ingin melanjutkan pendidikan.',
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
          <Badge className="mb-4 px-4 py-2 bg-purple-100 text-blue-600">
            Tentang Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
              SMA Warga Surakarta
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jl. Walter Monginsidi No.17, Tegalharjo, Kec. Jebres, Kota Surakarta, Jawa Tengah
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* <GraduationCap className="w-8 h-8 text-purple-600" /> */}
              <h3 className="text-2xl font-bold text-gray-800">Kenali SMA Warga Surakarta Lewat Quiz Seru!</h3>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
               Selamat datang di Quiz Edu Warga Surakarta! Kami hadir untuk membuat proses mengenal SMA Warga Surakarta jadi lebih seru dan interaktif. Lewat quiz sederhana ini, kamu bisa menguji pengetahuanmu, belajar hal baru, dan sekaligus melihat sekilas kegiatan, fasilitas, dan budaya belajar di sekolah kami.
              </p>
              
              <p>
               Tujuan kami adalah membantu siswa SMP seperti kamu untuk lebih mengenal SMA Warga Surakarta dengan cara yang menyenangkan, tanpa harus merasa bosan. Tantang dirimu, raih skor tertinggi, dan temukan keseruan belajar sambil bermain!
              </p>
              
              <p>
              SMA Warga Surakarta percaya bahwa proses belajar tidak harus membosankan. Melalui quiz interaktif ini, kamu bisa mengenal sekolah kami dengan cara yang menyenangkan, sekaligus mengasah kemampuan berpikir cepat. Dari fasilitas modern hingga kegiatan ekstrakurikuler yang menarik, semua bisa kamu temukan sambil bermain dan bersaing untuk meraih skor tertinggi!
              </p>
            </div>

            {/* Quick Stats */}
            {/* <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
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
          <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Good Character, Good Competence</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            SMA Warga Surakarta berkomitmen untuk mewujudkan generasi yang berkarakter mulia dan berkompeten dengan menanamkan nilai-nilai keimanan dan ketakwaan kepada Tuhan Yang Maha Esa melalui pendidikan agama dan moral, mengembangkan karakter mulia melalui pendidikan karakter dan budaya sekolah yang positif, meningkatkan kompetensi akademik dan nonakademik melalui kurikulum yang komprehensif serta berimbang, mengembangkan keterampilan digital yang diperlukan untuk hidup dan bekerja di era digital, serta membangun wawasan global dan kemampuan untuk memahami serta menghargai berbagai budaya di dunia.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="secondary" className="px-4 py-2">Visi & Misi</Badge>
            {/* <Badge variant="secondary" className="px-4 py-2">Adaptive Learning</Badge>
            <Badge variant="secondary" className="px-4 py-2">Instant Feedback</Badge>
            <Badge variant="secondary" className="px-4 py-2">Global Community</Badge> */}
          </div>
        </div>
      </div>
    </section>
  )
}