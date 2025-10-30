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
  { id: 'matematika', name: 'Matematika', icon: Target, color: 'bg-gray-600' },
  { id: 'fisika', name: 'Fisika', icon: Brain, color: 'bg-gray-700' },
  { id: 'kimia', name: 'Kimia', icon: Brain, color: 'bg-gray-600' },
  { id: 'sejarah', name: 'Sejarah', icon: BookOpen, color: 'bg-gray-800' },
  { id: 'bahasa_indonesia', name: 'Bahasa Indonesia', icon: BookOpen, color: 'bg-gray-700' },
  { id: 'bahasa_inggris', name: 'Bahasa Inggris', icon: BookOpen, color: 'bg-gray-600' },
  { id: 'astronomi', name: 'astronomi', icon: BookOpen, color: 'bg-gray-600' },

  
];
const sampleQuestions: Question[] = [
  // ---------------- matematika ----------------
  { id: 1, category: 'matematika', question: 'Hasil dari 45 + 38 adalah …', options: ['73', '83', '78', '80'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 2, category: 'matematika', question: 'Berapakah hasil dari 72 ÷ 8?', options: ['8', '9', '10', '7'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 3, category: 'matematika', question: 'Jika x + 9 = 20, maka nilai x adalah …', options: ['9', '10', '11', '12'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 4, category: 'matematika', question: 'Hasil dari 15 × 6 adalah …', options: ['80', '85', '90', '95'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 5, category: 'matematika', question: 'Hasil dari 2³ adalah …', options: ['6', '8', '9', '12'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 6, category: 'matematika', question: 'Jika keliling persegi adalah 36 cm, maka panjang sisinya …', options: ['8 cm', '9 cm', '10 cm', '12 cm'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 7, category: 'matematika', question: 'Nilai dari 5² + 3² adalah …', options: ['25', '34', '28', '32'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 8, category: 'matematika', question: 'Sebuah persegi panjang memiliki panjang 12 cm dan lebar 8 cm. Luasnya adalah …', options: ['96 cm²', '100 cm²', '88 cm²', '90 cm²'], correctAnswer: 0, difficulty: 'easy', points: 10 },
  { id: 9, category: 'matematika', question: 'Jika ⅔ dari suatu bilangan adalah 12, maka bilangan itu adalah …', options: ['16', '18', '20', '22'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 10, category: 'matematika', question: 'Berapakah hasil dari 7 × (8 + 4)?', options: ['84', '72', '70', '90'], correctAnswer: 0, difficulty: 'medium', points: 15 },
  { id: 11, category: 'matematika', question: 'Hasil dari 48 ÷ (6 × 2) adalah …', options: ['2', '3', '4', '5'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 12, category: 'matematika', question: 'Sebuah segitiga memiliki alas 10 cm dan tinggi 6 cm. Luasnya adalah …', options: ['30 cm²', '40 cm²', '50 cm²', '60 cm²'], correctAnswer: 0, difficulty: 'easy', points: 10 },
  { id: 13, category: 'matematika', question: 'Jika keliling lingkaran adalah 62,8 cm (π = 3,14), maka jari-jarinya adalah …', options: ['10 cm', '9 cm', '12 cm', '8 cm'], correctAnswer: 0, difficulty: 'medium', points: 15 },
  { id: 14, category: 'matematika', question: 'Berapakah hasil dari 5 × 4 + 2²?', options: ['22', '24', '28', '26'], correctAnswer: 3, difficulty: 'easy', points: 10 },
  { id: 15, category: 'matematika', question: 'Nilai dari √81 adalah …', options: ['7', '8', '9', '10'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 16, category: 'matematika', question: 'Jika 3x = 27, maka x = …', options: ['7', '8', '9', '10'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 17, category: 'matematika', question: 'Berapakah hasil dari 10% × 250?', options: ['20', '25', '30', '35'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 18, category: 'matematika', question: 'Sebuah kubus memiliki sisi 5 cm. Volumenya adalah …', options: ['125 cm³', '100 cm³', '150 cm³', '200 cm³'], correctAnswer: 0, difficulty: 'easy', points: 10 },
  { id: 19, category: 'matematika', question: 'Jika harga 5 buku adalah Rp50.000, maka harga 1 buku adalah …', options: ['Rp8.000', 'Rp10.000', 'Rp12.000', 'Rp15.000'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 20, category: 'matematika', question: 'Sebuah mobil menempuh jarak 120 km dalam waktu 3 jam. Kecepatannya adalah …', options: ['30 km/jam', '40 km/jam', '50 km/jam', '60 km/jam'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 21, category: 'matematika', question: 'Jika sebuah persegi memiliki luas 49 cm², maka panjang sisinya adalah …', options: ['6 cm', '7 cm', '8 cm', '9 cm'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 22, category: 'matematika', question: 'Nilai dari 2 × (4 + 3)² adalah …', options: ['49', '98', '28', '56'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 23, category: 'matematika', question: 'Hasil dari 120 - (35 + 25) adalah …', options: ['55', '60', '65', '70'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 24, category: 'matematika', question: 'Sebuah tabung memiliki jari-jari 7 cm dan tinggi 10 cm. Volumenya adalah … (π = 3,14)', options: ['1.540 cm³', '1.480 cm³', '1.520 cm³', '1.400 cm³'], correctAnswer: 0, difficulty: 'hard', points: 20 },
  { id: 25, category: 'matematika', question: 'Hasil dari 6 × 12 ÷ 3 adalah …', options: ['22', '23', '24', '25'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 26, category: 'matematika', question: 'Nilai dari ¼ × 36 adalah …', options: ['8', '9', '10', '12'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 27, category: 'matematika', question: 'Berapakah hasil dari 8² - 6²?', options: ['24', '26', '28', '20'], correctAnswer: 0, difficulty: 'medium', points: 15 },
  { id: 28, category: 'matematika', question: 'Sebuah segitiga sama sisi memiliki keliling 36 cm. Panjang satu sisinya adalah …', options: ['10 cm', '12 cm', '14 cm', '15 cm'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 29, category: 'matematika', question: 'Jika nilai rata-rata dari 4, 6, 8, dan 10 adalah …', options: ['6', '7', '8', '9'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 30, category: 'matematika', question: 'Sudut pada segitiga sama sisi masing-masing besarnya adalah …', options: ['30°', '45°', '60°', '90°'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 31, category: 'matematika', question: 'Jika 2x + 5 = 11, maka x = …', options: ['2', '3', '4', '5'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 32, category: 'matematika', question: 'Hasil dari 0,25 × 40 adalah …', options: ['5', '8', '10', '12'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 33, category: 'matematika', question: 'Nilai dari ¾ × 20 adalah …', options: ['12', '13', '14', '15'], correctAnswer: 3, difficulty: 'medium', points: 15 },
  { id: 34, category: 'matematika', question: 'Berapakah hasil dari 2⁴?', options: ['6', '8', '12', '16'], correctAnswer: 3, difficulty: 'easy', points: 10 },
  { id: 35, category: 'matematika', question: 'Sebuah bak berisi 60 liter air. Jika ¼ bagian diambil, sisa airnya adalah …', options: ['30 liter', '45 liter', '50 liter', '55 liter'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 36, category: 'matematika', question: 'Jika suhu meningkat dari 25°C ke 40°C, kenaikannya adalah …', options: ['10°C', '15°C', '20°C', '25°C'], correctAnswer: 1, difficulty: 'easy', points: 10 },
  { id: 37, category: 'matematika', question: 'Hasil dari 3 × (5 + 7) ÷ 2 adalah …', options: ['16', '18', '20', '21'], correctAnswer: 0, difficulty: 'medium', points: 15 },
  { id: 38, category: 'matematika', question: 'Bilangan prima antara 10 dan 20 adalah …', options: ['11, 13, 17, 19', '12, 14, 16, 18', '10, 11, 15, 17', '9, 11, 13, 15'], correctAnswer: 0, difficulty: 'medium', points: 15 },
  { id: 39, category: 'matematika', question: 'Hasil dari 0,5 × 0,4 adalah …', options: ['0,20', '0,25', '0,15', '0,30'], correctAnswer: 0, difficulty: 'easy', points: 10 },
  { id: 40, category: 'matematika', question: 'Jika 40% dari suatu bilangan adalah 80, maka bilangan itu adalah …', options: ['100', '150', '180', '200'], correctAnswer: 3, difficulty: 'medium', points: 15 },
  { id: 41, category: 'matematika', question: 'Rata-rata dari 10, 15, 20, dan 25 adalah …', options: ['15', '16', '17,5', '18'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 42, category: 'matematika', question: 'Sebuah persegi panjang memiliki keliling 50 cm dan lebar 10 cm. Panjangnya adalah …', options: ['15 cm', '20 cm', '25 cm', '30 cm'], correctAnswer: 1, difficulty: 'hard', points: 20 },
  { id: 43, category: 'matematika', question: 'Nilai dari 6² + 8² adalah …', options: ['80', '90', '100', '110'], correctAnswer: 2, difficulty: 'medium', points: 15 },
  { id: 44, category: 'matematika', question: 'Berapakah ⅗ dari 45?', options: ['25', '27', '28', '30'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 45, category: 'matematika', question: 'Nilai dari (12 – 4) × 3 adalah …', options: ['18', '20', '22', '24'], correctAnswer: 0, difficulty: 'easy', points: 10 },
  { id: 46, category: 'matematika', question: 'Berapakah hasil dari 9 × 9?', options: ['72', '80', '81', '90'], correctAnswer: 2, difficulty: 'easy', points: 10 },
  { id: 47, category: 'matematika', question: 'Jika 25% dari suatu bilangan adalah 60, maka bilangan itu adalah …', options: ['180', '200', '220', '240'], correctAnswer: 1, difficulty: 'medium', points: 15 },
  { id: 48, category: 'matematika', question: 'Sebuah lingkaran memiliki jari-jari 14 cm. Kelilingnya adalah … (π = 22/7)', options: ['84 cm', '88 cm', '90 cm', '92 cm'], correctAnswer: 0, difficulty: 'hard', points: 20 },
  { id: 49, category: 'matematika', question: 'Jika 3y - 6 = 12, maka nilai y adalah …', options: ['4', '5', '6', '7'], correctAnswer: 2, difficulty: 'medium', points: 15 },
  { id: 50, category: 'matematika', question: 'Hasil dari (2 + 3) × (4 + 5) adalah …', options: ['35', '40', '45', '50'], correctAnswer: 0, difficulty: 'easy', points: 10 },

  // ---------------- fisika ----------------
  {
    id: 51,
    category: "fisika",
    question: "Besaran yang memiliki satuan meter per sekon (m/s) adalah...",
    options: ["Gaya", "Kecepatan", "Massa", "Energi"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 52,
    category: "fisika",
    question: "Alat untuk mengukur kuat arus listrik adalah...",
    options: ["Voltmeter", "Amperemeter", "Ohmmeter", "Termometer"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 53,
    category: "fisika",
    question: "Satuan SI untuk gaya adalah...",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 54,
    category: "fisika",
    question: "Benda dikatakan bergerak jika...",
    options: ["Benda diam di tempat", "Posisi benda berubah terhadap acuan", "Benda berpindah tapi jarak tetap", "Benda diam relatif terhadap acuan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 55,
    category: "fisika",
    question: "Energi yang dimiliki benda karena gerak disebut...",
    options: ["Energi potensial", "Energi kinetik", "Energi panas", "Energi listrik"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 56,
    category: "fisika",
    question: "Rumus untuk mencari gaya adalah...",
    options: ["F = m × a", "F = m ÷ a", "F = a ÷ m", "F = m + a"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 57,
    category: "fisika",
    question: "Jika gaya 20 N bekerja pada benda bermassa 4 kg, percepatan benda adalah...",
    options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 58,
    category: "fisika",
    question: "Gaya gesek selalu bekerja...",
    options: ["Searah dengan gerak benda", "Berlawanan arah dengan gerak benda", "Tegak lurus arah gerak", "Tidak berpengaruh"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 59,
    category: "fisika",
    question: "Tekanan berbanding terbalik dengan...",
    options: ["Gaya", "Luas bidang tekan", "Massa", "Volume"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 60,
    category: "fisika",
    question: "Satuan tekanan dalam SI adalah...",
    options: ["Newton", "Joule", "Pascal", "Ohm"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 61,
    category: "fisika",
    question: "Bunyi tidak dapat merambat melalui...",
    options: ["Padat", "Cair", "Gas", "Ruang hampa"],
    correctAnswer: 3,
    difficulty: "medium",
    points: 10
  },
  {
    id: 62,
    category: "fisika",
    question: "Cahaya termasuk gelombang...",
    options: ["Mekanik", "Longitudinal", "Transversal", "Bunyi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 63,
    category: "fisika",
    question: "Ketika cahaya melewati prisma, ia mengalami...",
    options: ["Refleksi", "Refraksi", "Difraksi", "Interferensi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 64,
    category: "fisika",
    question: "Bayangan pada cermin datar bersifat...",
    options: ["Nyata dan terbalik", "Maya dan tegak", "Nyata dan tegak", "Lebih kecil dari benda"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 65,
    category: "fisika",
    question: "Alat untuk mengukur massa jenis benda cair adalah...",
    options: ["Barometer", "Hidrometer", "Manometer", "Termometer"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 66,
    category: "fisika",
    question: "Sumber energi terbesar di Bumi adalah...",
    options: ["Matahari", "Minyak bumi", "Batu bara", "Angin"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 67,
    category: "fisika",
    question: "Perpindahan panas secara langsung melalui zat padat disebut...",
    options: ["Konduksi", "Konveksi", "Radiasi", "Transmisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 68,
    category: "fisika",
    question: "Termometer digunakan untuk mengukur...",
    options: ["Panjang", "Waktu", "Suhu", "Massa"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 69,
    category: "fisika",
    question: "Perubahan wujud dari padat ke gas disebut...",
    options: ["Menyublim", "Mengembun", "Meleleh", "Membeku"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 70,
    category: "fisika",
    question: "Satuan energi dalam SI adalah...",
    options: ["Joule", "Watt", "Newton", "Ampere"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 71,
    category: "fisika",
    question: "Hambatan listrik dilambangkan dengan huruf...",
    options: ["R", "I", "V", "P"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 72,
    category: "fisika",
    question: "Bunyi yang memiliki frekuensi di atas 20.000 Hz disebut...",
    options: ["Infrasonik", "Audiosonik", "Ultrasonik", "Supersonik"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 73,
    category: "fisika",
    question: "Salah satu contoh energi potensial adalah...",
    options: ["Batu di atas tebing", "Mobil yang melaju", "Kipas yang berputar", "Lampu menyala"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 74,
    category: "fisika",
    question: "Gaya gravitasi ditemukan oleh...",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "James Watt"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 75,
    category: "fisika",
    question: "Arus listrik mengalir dari...",
    options: ["Kutub negatif ke positif", "Kutub positif ke negatif", "Searah medan listrik", "Tidak tentu arah"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 76,
    category: "fisika",
    question: "Satuan daya listrik adalah...",
    options: ["Volt", "Watt", "Ampere", "Joule"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 77,
    category: "fisika",
    question: "Jika sebuah lampu 40 W dinyalakan selama 2 jam, energi yang digunakan adalah...",
    options: ["40 J", "80 J", "288.000 J", "120.000 J"],
    correctAnswer: 2,
    difficulty: "hard",
    points: 15
  },
  {
    id: 78,
    category: "fisika",
    question: "Kaca pembesar termasuk jenis lensa...",
    options: ["Cekung", "Cembung", "Datar", "Silinder"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 79,
    category: "fisika",
    question: "Sifat bayangan pada lensa cembung dapat bersifat...",
    options: ["Selalu maya", "Selalu nyata", "Tergantung jarak benda", "Selalu tegak"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 80,
    category: "fisika",
    question: "Besaran turunan berikut adalah...",
    options: ["Massa", "Waktu", "Kecepatan", "Panjang"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 81,
    category: "fisika",
    question: "Besaran pokok yang satuannya kelvin digunakan untuk mengukur...",
    options: ["Panjang", "Massa", "Suhu", "Waktu"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 82,
    category: "fisika",
    question: "Alat yang digunakan untuk mengukur tekanan udara adalah...",
    options: ["Termometer", "Manometer", "Barometer", "Altimeter"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 83,
    category: "fisika",
    question: "Rumus tekanan adalah...",
    options: ["P = F/A", "P = A/F", "P = m × g", "P = F × A"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 84,
    category: "fisika",
    question: "Hukum Archimedes berbunyi...",
    options: [
      "Tekanan berbanding lurus dengan gaya",
      "Benda yang dicelupkan ke dalam zat cair akan mendapat gaya ke atas sebesar berat zat cair yang dipindahkan",
      "Setiap gaya memiliki reaksi yang berlawanan",
      "Energi tidak dapat diciptakan atau dimusnahkan"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 85,
    category: "fisika",
    question: "Satuan frekuensi dalam SI adalah...",
    options: ["Hertz", "Joule", "Pascal", "Watt"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 86,
    category: "fisika",
    question: "Gelombang yang arah rambatnya sejajar dengan arah getarnya disebut...",
    options: ["Transversal", "Longitudinal", "Stasioner", "Elektromagnetik"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 87,
    category: "fisika",
    question: "Satuan hambatan listrik dalam SI adalah...",
    options: ["Volt", "Ohm", "Ampere", "Joule"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 88,
    category: "fisika",
    question: "Hukum Ohm dinyatakan dengan rumus...",
    options: ["V = I × R", "P = V × I", "R = V × I", "I = R × V"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 89,
    category: "fisika",
    question: "Jika tegangan 12 V dan arus 2 A, maka hambatannya adalah...",
    options: ["6 Ohm", "12 Ohm", "24 Ohm", "2 Ohm"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 90,
    category: "fisika",
    question: "Energi listrik dapat diubah menjadi energi panas pada alat...",
    options: ["Lampu pijar", "Kipas angin", "Motor listrik", "Radio"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 91,
    category: "fisika",
    question: "Hukum kekekalan energi menyatakan bahwa...",
    options: [
      "Energi dapat diciptakan dan dimusnahkan",
      "Energi tidak dapat diciptakan maupun dimusnahkan, hanya diubah bentuknya",
      "Energi selalu berkurang",
      "Energi tidak dapat berubah bentuk"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 92,
    category: "fisika",
    question: "Perpindahan panas tanpa zat perantara disebut...",
    options: ["Konduksi", "Konveksi", "Radiasi", "Refleksi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 93,
    category: "fisika",
    question: "Ketika logam dipanaskan, volumenya akan...",
    options: ["Tetap", "Mengecil", "Membesar", "Menghilang"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 94,
    category: "fisika",
    question: "Fenomena pembiasan menyebabkan pensil dalam air terlihat...",
    options: ["Lebih pendek", "Lebih panjang", "Patah", "Tidak terlihat"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 95,
    category: "fisika",
    question: "Cermin yang digunakan pada mobil untuk melihat area luas adalah...",
    options: ["Cermin datar", "Cermin cembung", "Cermin cekung", "Kaca pembesar"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 96,
    category: "fisika",
    question: "Energi potensial gravitasi bergantung pada...",
    options: ["Massa dan kecepatan", "Massa dan ketinggian", "Luas dan tekanan", "Waktu dan gaya"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 97,
    category: "fisika",
    question: "Rumus energi potensial gravitasi adalah...",
    options: ["Ep = m × g × h", "Ep = m × v²", "Ep = F × s", "Ep = I × V"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 98,
    category: "fisika",
    question: "Ketika benda jatuh bebas, energi kinetiknya akan...",
    options: ["Tetap", "Berkurang", "Bertambah", "Hilang"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 99,
    category: "fisika",
    question: "Gelombang bunyi termasuk jenis gelombang...",
    options: ["Transversal", "Longitudinal", "Elektromagnetik", "Stasioner"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 100,
    category: "fisika",
    question: "Satuan percepatan gravitasi adalah...",
    options: ["m/s", "m/s²", "m²/s", "m²/s²"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },

  // ---------------- kimia ----------------
  {
    id: 101,
    category: "kimia",
    question: "Air (H₂O) termasuk jenis zat...",
    options: ["Unsur", "Senyawa", "Campuran", "Logam"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 102,
    category: "kimia",
    question: "Unsur yang paling banyak di udara adalah...",
    options: ["Oksigen", "Nitrogen", "Karbon dioksida", "Hidrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 103,
    category: "kimia",
    question: "Rumus kimia garam dapur adalah...",
    options: ["NaOH", "NaCl", "KCl", "HCl"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 104,
    category: "kimia",
    question: "Senyawa yang terbentuk dari unsur karbon dan oksigen adalah...",
    options: ["CO₂", "NaCl", "H₂O", "NH₃"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 105,
    category: "kimia",
    question: "Unsur yang menjadi bahan utama pembentuk baja adalah...",
    options: ["Tembaga", "Aluminium", "Besi", "Perak"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 106,
    category: "kimia",
    question: "Perubahan wujud dari padat menjadi cair disebut...",
    options: ["Menguap", "Membeku", "Meleleh", "Mengkristal"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 107,
    category: "kimia",
    question: "Proses penguapan yang terjadi pada seluruh bagian zat cair disebut...",
    options: ["Menguap", "Mendidih", "Menyublim", "Mengkristal"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 108,
    category: "kimia",
    question: "Perubahan kimia ditandai oleh...",
    options: ["Perubahan warna", "Perubahan wujud sementara", "Tidak ada zat baru", "Zat kembali seperti semula"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 109,
    category: "kimia",
    question: "Perkaratan pada besi merupakan contoh dari...",
    options: ["Perubahan fisika", "Perubahan kimia", "Sublimasi", "Kondensasi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 110,
    category: "kimia",
    question: "Zat yang dapat menetralkan asam adalah...",
    options: ["Air", "Basa", "Garam", "Gas"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 111,
    category: "kimia",
    question: "Zat dengan pH kurang dari 7 disebut...",
    options: ["Asam", "Basa", "Netral", "Garam"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 112,
    category: "kimia",
    question: "Zat dengan pH lebih dari 7 disebut...",
    options: ["Asam", "Basa", "Netral", "Asam lemah"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 113,
    category: "kimia",
    question: "Campuran air dan minyak termasuk campuran...",
    options: ["Homogen", "Heterogen", "Padat", "Gas"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 114,
    category: "kimia",
    question: "Larutan gula dalam air adalah contoh campuran...",
    options: ["Homogen", "Heterogen", "Gas", "Padat"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 115,
    category: "kimia",
    question: "Zat yang dapat menghantarkan listrik disebut...",
    options: ["Isolator", "Konduktor", "Larutan", "Senyawa"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 116,
    category: "kimia",
    question: "Zat yang menyebabkan karat pada besi adalah...",
    options: ["Karbon dioksida", "Oksigen dan air", "Hidrogen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 117,
    category: "kimia",
    question: "Proses fotosintesis menghasilkan...",
    options: ["Oksigen dan air", "Oksigen dan glukosa", "Karbon dioksida dan air", "Air dan energi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 118,
    category: "kimia",
    question: "Unsur yang paling ringan adalah...",
    options: ["Helium", "Hidrogen", "Oksigen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 119,
    category: "kimia",
    question: "Zat yang dapat mempercepat reaksi kimia tanpa ikut bereaksi disebut...",
    options: ["Katalis", "Reaktan", "Produk", "Pelarut"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 120,
    category: "kimia",
    question: "Air kapur menjadi keruh bila dilewati gas CO₂ karena terbentuk...",
    options: ["Garam", "Endapan", "Buih", "Asam"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 121,
    category: "kimia",
    question: "Unsur dengan simbol Fe adalah...",
    options: ["Fluorin", "Fosfor", "Besi", "Ferium"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 122,
    category: "kimia",
    question: "Unsur dengan simbol Cu adalah...",
    options: ["Kalsium", "Kromium", "Karbon", "Tembaga"],
    correctAnswer: 3,
    difficulty: "easy",
    points: 5
  },
  {
    id: 123,
    category: "kimia",
    question: "Hukum kekekalan massa menyatakan bahwa...",
    options: [
      "Massa zat berubah setelah reaksi",
      "Massa zat sebelum dan sesudah reaksi tetap sama",
      "Massa zat selalu berkurang",
      "Massa zat tidak dapat diukur"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 124,
    category: "kimia",
    question: "Zat yang digunakan untuk memutihkan pakaian adalah...",
    options: ["Alkohol", "Klorin", "Amonia", "Aseton"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 125,
    category: "kimia",
    question: "Zat yang terkandung dalam cuka adalah...",
    options: ["Asam asetat", "Asam klorida", "Asam sulfat", "Asam nitrat"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 126,
    category: "kimia",
    question: "Gas yang menyebabkan efek rumah kaca adalah...",
    options: ["Oksigen", "Karbon dioksida", "Hidrogen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 127,
    category: "kimia",
    question: "Zat yang dapat mengubah warna lakmus merah menjadi biru adalah...",
    options: ["Asam", "Basa", "Garam", "Air"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 128,
    category: "kimia",
    question: "Gas yang diperlukan untuk pembakaran adalah...",
    options: ["Hidrogen", "Oksigen", "Karbon dioksida", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 129,
    category: "kimia",
    question: "Gas yang dihasilkan pada proses fotosintesis adalah...",
    options: ["Oksigen", "Karbon dioksida", "Hidrogen", "Nitrogen"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 130,
    category: "kimia",
    question: "Campuran pasir dan air dapat dipisahkan dengan cara...",
    options: ["Filtrasi", "Destilasi", "Evaporasi", "Kristalisasi"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 131,
    category: "kimia",
    question: "Destilasi digunakan untuk memisahkan campuran berdasarkan...",
    options: ["Perbedaan titik didih", "Perbedaan warna", "Perbedaan massa jenis", "Perbedaan bentuk"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 132,
    category: "kimia",
    question: "Larutan asam dapat mengubah lakmus biru menjadi...",
    options: ["Merah", "Hijau", "Kuning", "Tidak berubah"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 133,
    category: "kimia",
    question: "Zat yang mengandung atom karbon disebut...",
    options: ["Organik", "Anorganik", "Logam", "Gas mulia"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 134,
    category: "kimia",
    question: "Zat yang dapat melarutkan zat lain disebut...",
    options: ["Pelarut", "Terlarut", "Reaktan", "Katalis"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 135,
    category: "kimia",
    question: "Air murni merupakan contoh zat...",
    options: ["Campuran", "Senyawa", "Unsur", "Larutan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 136,
    category: "kimia",
    question: "Proses pembentukan karat disebut...",
    options: ["Oksidasi", "Reduksi", "Netralisasi", "Destilasi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 137,
    category: "kimia",
    question: "Hidrogen memiliki jumlah atom sebanyak...",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 138,
    category: "kimia",
    question: "Perubahan air menjadi es merupakan contoh perubahan...",
    options: ["kimia", "Fisis", "Radiasi", "Katalisis"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 139,
    category: "kimia",
    question: "Zat yang memiliki massa tetapi tidak memiliki bentuk tetap disebut...",
    options: ["Cair", "Padat", "Gas", "Plasma"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 140,
    category: "kimia",
    question: "Asap kendaraan terutama mengandung gas...",
    options: ["CO₂", "CO", "H₂", "O₃"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
  id: 141,
  category: "kimia",
  question: "Bahan bakar yang ramah lingkungan dan dihasilkan dari tumbuhan disebut...",
  options: ["Bensin", "Solar", "Bioetanol", "Minyak tanah"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 142,
  category: "kimia",
  question: "Unsur yang digunakan untuk mengisi balon udara karena ringan adalah...",
  options: ["Oksigen", "Hidrogen", "Helium", "Nitrogen"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 143,
  category: "kimia",
  question: "Bahan kimia dalam baterai yang dapat mencemari lingkungan adalah...",
  options: ["Kalsium", "Merkuri", "Zat warna", "Amonia"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 144,
  category: "kimia",
  question: "Proses pemisahan campuran padat dan cair dengan penyaringan disebut...",
  options: ["Destilasi", "Filtrasi", "Kristalisasi", "Sublimasi"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 145,
  category: "kimia",
  question: "Larutan yang dapat menghantarkan arus listrik disebut...",
  options: ["Elektrolit", "Non-elektrolit", "Isolator", "Konduktor"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 146,
  category: "kimia",
  question: "Proses perubahan gas menjadi cair disebut...",
  options: ["Mengkristal", "Meleleh", "Mengembun", "Menyublim"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 147,
  category: "kimia",
  question: "Zat kimia yang digunakan untuk mensterilkan air kolam renang adalah...",
  options: ["Klorin", "Amonia", "Oksigen", "Karbon dioksida"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 148,
  category: "kimia",
  question: "Perubahan zat padat langsung menjadi gas disebut...",
  options: ["Menguap", "Sublimasi", "Mengembun", "Meleleh"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 149,
  category: "kimia",
  question: "Gas yang membuat soda memiliki gelembung adalah...",
  options: ["Oksigen", "Hidrogen", "Karbon dioksida", "Nitrogen"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 150,
  category: "kimia",
  question: "Bahan yang digunakan sebagai bahan baku pupuk urea adalah...",
  options: ["Amonia", "Karbon dioksida", "Nitrogen", "Metana"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},

  // ---------------- sejarah ----------------
  {
  id: 151,
  category: "sejarah",
  question: "Proklamasi kemerdekaan Indonesia dibacakan pada tanggal...",
  options: ["17 Agustus 1945", "10 November 1945", "1 Juni 1945", "20 Mei 1908"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 152,
  category: "sejarah",
  question: "Teks proklamasi kemerdekaan Indonesia diketik oleh...",
  options: ["Sukarno", "Moh. Hatta", "Sayuti Melik", "Ahmad Subardjo"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 153,
  category: "sejarah",
  question: "Tokoh pendiri Budi Utomo adalah...",
  options: ["Dr. Soetomo", "Ki Hajar Dewantara", "HOS Tjokroaminoto", "Moh. Yamin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 154,
  category: "sejarah",
  question: "Budi Utomo berdiri pada tahun...",
  options: ["1905", "1908", "1910", "1928"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 155,
  category: "sejarah",
  question: "Sumpah Pemuda diikrarkan pada tanggal...",
  options: ["20 Mei 1908", "28 Oktober 1928", "17 Agustus 1945", "10 November 1945"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 156,
  category: "sejarah",
  question: "Tokoh yang dikenal sebagai Bapak Pendidikan Nasional adalah...",
  options: ["Ki Hajar Dewantara", "Dr. Soetomo", "Soekarno", "Moh. Hatta"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 157,
  category: "sejarah",
  question: "Kerajaan Hindu tertua di Indonesia adalah...",
  options: ["Majapahit", "Kutai", "Sriwijaya", "Tarumanegara"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 158,
  category: "sejarah",
  question: "Kerajaan Sriwijaya berpusat di daerah...",
  options: ["Sumatera Selatan", "Jawa Timur", "Kalimantan", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 159,
  category: "sejarah",
  question: "Pendiri kerajaan Majapahit adalah...",
  options: ["Hayam Wuruk", "Raden Wijaya", "Gajah Mada", "Kertanegara"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 160,
  category: "sejarah",
  question: "Gajah Mada terkenal dengan ikrarnya yaitu...",
  options: ["Ikrar Kebulatan Tekad", "Sumpah Palapa", "Piagam Jakarta", "Sumpah Pemuda"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 161,
  category: "sejarah",
  question: "Kerajaan Islam pertama di Indonesia adalah...",
  options: ["Demak", "Samarinda", "Perlak", "Aceh Darussalam"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 162,
  category: "sejarah",
  question: "Kerajaan Majapahit mencapai puncak kejayaan pada masa...",
  options: ["Kertanegara", "Raden Wijaya", "Hayam Wuruk", "Ken Arok"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 163,
  category: "sejarah",
  question: "Tokoh yang mengusulkan dasar negara Pancasila adalah...",
  options: ["Soekarno", "Moh. Hatta", "Soepomo", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 164,
  category: "sejarah",
  question: "Peristiwa G30S/PKI terjadi pada tahun...",
  options: ["1945", "1950", "1965", "1970"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 165,
  category: "sejarah",
  question: "Tokoh pejuang wanita dari Aceh adalah...",
  options: ["Cut Nyak Dien", "R.A. Kartini", "Martha Christina Tiahahu", "Dewi Sartika"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 166,
  category: "sejarah",
  question: "Tokoh pejuang wanita yang berasal dari Jepara adalah...",
  options: ["Cut Nyak Dien", "R.A. Kartini", "Dewi Sartika", "Fatmawati"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 167,
  category: "sejarah",
  question: "Perang Diponegoro terjadi pada tahun...",
  options: ["1825–1830", "1800–1810", "1850–1855", "1900–1905"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 168,
  category: "sejarah",
  question: "Tokoh utama dalam Perang Diponegoro adalah...",
  options: ["Pangeran Antasari", "Sultan Hasanuddin", "Pangeran Diponegoro", "Tuanku Imam Bonjol"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 169,
  category: "sejarah",
  question: "Pahlawan nasional dari Kalimantan Selatan adalah...",
  options: ["Sultan Hasanuddin", "Pangeran Antasari", "Pattimura", "Kapitan Pattimura"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 170,
  category: "sejarah",
  question: "Perang Pattimura terjadi di daerah...",
  options: ["Maluku", "Sumatera", "Jawa", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 171,
  category: "sejarah",
  question: "Tanggal 10 November diperingati sebagai hari...",
  options: ["Pahlawan", "Kemerdekaan", "Kebangkitan Nasional", "Koperasi"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 172,
  category: "sejarah",
  question: "Tokoh proklamator Indonesia adalah...",
  options: ["Soekarno dan Hatta", "Soekarno dan Sjahrir", "Hatta dan Sudirman", "Hatta dan Yamin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 173,
  category: "sejarah",
  question: "Perang Tondano terjadi di daerah...",
  options: ["Sulawesi Utara", "Sumatera Barat", "Kalimantan Timur", "Bali"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 174,
  category: "sejarah",
  question: "Organisasi Taman Siswa didirikan oleh...",
  options: ["Ki Hajar Dewantara", "Dr. Soetomo", "HOS Tjokroaminoto", "Kartini"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 175,
  category: "sejarah",
  question: "Tuanku Imam Bonjol memimpin perang di daerah...",
  options: ["Sumatera Barat", "Aceh", "Jawa Tengah", "Maluku"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 176,
  category: "sejarah",
  question: "Sultan Hasanuddin dijuluki sebagai...",
  options: ["Pahlawan dari Maluku", "Ayam Jantan dari Timur", "Pahlawan dari Aceh", "Raja Jawa"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 177,
  category: "sejarah",
  question: "Peristiwa Bandung Lautan Api terjadi pada tahun...",
  options: ["1945", "1946", "1947", "1948"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 178,
  category: "sejarah",
  question: "Pahlawan nasional dari Maluku adalah...",
  options: ["Pattimura", "Cut Nyak Dien", "Diponegoro", "Sultan Hasanuddin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 179,
  category: "sejarah",
  question: "Perang Puputan terjadi di daerah...",
  options: ["Bali", "Aceh", "Jawa", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 180,
  category: "sejarah",
  question: "Perjanjian Renville ditandatangani pada tahun...",
  options: ["1946", "1947", "1948", "1949"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 181,
  category: "sejarah",
  question: "Tujuan utama dari perjanjian Linggarjati adalah...",
  options: ["Mengakhiri penjajahan", "Mengatur wilayah kekuasaan", "Mengatur hubungan dagang", "Menjalin kerja sama ekonomi"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 182,
  category: "sejarah",
  question: "Tokoh pahlawan nasional dari Sulawesi Selatan adalah...",
  options: ["Pangeran Antasari", "Sultan Hasanuddin", "Pattimura", "Cut Nyak Dien"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 183,
  category: "sejarah",
  question: "Organisasi Sarekat Islam berdiri pada tahun...",
  options: ["1910", "1911", "1912", "1913"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 184,
  category: "sejarah",
  question: "Pemimpin pertama Sarekat Islam adalah...",
  options: ["HOS Tjokroaminoto", "Soekarno", "Ki Hajar Dewantara", "Dr. Soetomo"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 185,
  category: "sejarah",
  question: "Perjanjian Bongaya terjadi antara Belanda dan...",
  options: ["Kerajaan Ternate", "Kerajaan Gowa", "Kerajaan Majapahit", "Kerajaan Sriwijaya"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 186,
  category: "sejarah",
  question: "Organisasi PNI didirikan oleh...",
  options: ["Soekarno", "Moh. Hatta", "Soepomo", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 187,
  category: "sejarah",
  question: "Perjanjian Roem-Royen dilakukan pada tahun...",
  options: ["1948", "1949", "1950", "1951"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 188,
  category: "sejarah",
  question: "Negara Indonesia resmi menjadi anggota PBB pada tahun...",
  options: ["1949", "1950", "1955", "1960"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 189,
  category: "sejarah",
  question: "Konferensi Asia-Afrika diadakan di kota...",
  options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 190,
  category: "sejarah",
  question: "Tujuan utama Konferensi Asia-Afrika adalah...",
  options: ["Mendirikan PBB", "Menolak kolonialisme", "Membangun ekonomi Asia", "Menentang perang dunia"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 191,
  category: "sejarah",
  question: "Pahlawan nasional dari Minahasa adalah...",
  options: ["Pattimura", "Sam Ratulangi", "Sudirman", "Antasari"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 192,
  category: "sejarah",
  question: "Dr. Cipto Mangunkusumo dikenal sebagai tokoh dari organisasi...",
  options: ["Budi Utomo", "Indische Partij", "Taman Siswa", "PNI"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 193,
  category: "sejarah",
  question: "Indische Partij didirikan oleh Douwes Dekker, Cipto Mangunkusumo, dan...",
  options: ["Ki Hajar Dewantara", "Soekarno", "Moh. Hatta", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 194,
  category: "sejarah",
  question: "Kongres Pemuda II dilaksanakan di kota...",
  options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 195,
  category: "sejarah",
  question: "Pahlawan nasional yang dijuluki 'Bung Tomo' berasal dari kota...",
  options: ["Surabaya", "Jakarta", "Semarang", "Medan"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 196,
  category: "sejarah",
  question: "Isi utama Sumpah Pemuda adalah...",
  options: ["Satu nusa, satu bangsa, satu bahasa", "Satu tanah air", "Merdeka atau mati", "Cinta tanah air"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 197,
  category: "sejarah",
  question: "Peristiwa Rengasdengklok terjadi sebelum...",
  options: ["Proklamasi", "Kongres Pemuda", "Konferensi Meja Bundar", "Sumpah Pemuda"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 198,
  category: "sejarah",
  question: "Konferensi Meja Bundar (KMB) diadakan pada tahun...",
  options: ["1948", "1949", "1950", "1951"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 199,
  category: "sejarah",
  question: "Tokoh utama dalam Perang Padri adalah...",
  options: ["Pangeran Diponegoro", "Tuanku Imam Bonjol", "Sultan Hasanuddin", "Pattimura"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 200,
  category: "sejarah",
  question: "Rumusan dasar negara pertama kali muncul dalam sidang...",
  options: ["BPUPKI", "PPKI", "KNIP", "DPR"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},

  // ---------------- bahasa_indonesia ----------------
  {
    id: 201,
    category: "bahasa_indonesia",
    question: "Gagasan utama dari sebuah paragraf disebut...",
    options: ["Ide pokok", "Kalimat utama", "Kesimpulan", "Judul"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 202,
    category: "bahasa_indonesia",
    question: "Kalimat yang berisi ajakan biasanya menggunakan kata...",
    options: ["Sebaiknya", "Harus", "Mari", "Akan"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 203,
    category: "bahasa_indonesia",
    question: "Kalimat efektif harus memiliki...",
    options: ["Banyak kata", "Subjek dan predikat", "Kata sulit", "Kalimat majemuk"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 204,
    category: "bahasa_indonesia",
    question: "Sinonim dari kata 'indah' adalah...",
    options: ["Cantik", "Buruk", "Hitam", "Kotor"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 205,
    category: "bahasa_indonesia",
    question: "Antonim dari kata 'tinggi' adalah...",
    options: ["Panjang", "Rendah", "Kecil", "Pendek"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 206,
    category: "bahasa_indonesia",
    question: "Kata baku dari 'aktifitas' adalah...",
    options: ["Aktivitas", "Aktifitas", "Aktivas", "Akitvitas"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 207,
    category: "bahasa_indonesia",
    question: "Kalimat yang benar penulisannya adalah...",
    options: ["Dia pergi ke pasar, untuk membeli sayur.", "Dia pergi ke pasar untuk membeli sayur.", "Dia pergi ke pasar. untuk membeli sayur", "Dia pergi ke pasar untuk membeli sayur,"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 208,
    category: "bahasa_indonesia",
    question: "Kalimat yang mengandung makna perintah adalah...",
    options: ["Kamu sudah makan?", "Tolong ambilkan buku itu!", "Dia sedang membaca buku.", "Mereka bermain di taman."],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 209,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang termasuk kalimat majemuk adalah...",
    options: [
      "Saya pergi ke sekolah.",
      "Ibu memasak di dapur dan ayah membaca koran.",
      "Dia makan nasi.",
      "Mereka bermain bola."
    ],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 210,
    category: "bahasa_indonesia",
    question: "Teks yang berisi langkah-langkah melakukan sesuatu disebut teks...",
    options: ["Prosedur", "Deskripsi", "Narasi", "Eksposisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 211,
    category: "bahasa_indonesia",
    question: "Tujuan dari teks deskripsi adalah...",
    options: ["Menjelaskan proses", "Mendeskripsikan objek secara detail", "Memberi pendapat", "Membujuk pembaca"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 212,
    category: "bahasa_indonesia",
    question: "Teks narasi biasanya menceritakan tentang...",
    options: ["Langkah kerja", "Suatu peristiwa", "Pendapat seseorang", "Penjelasan ilmiah"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 213,
    category: "bahasa_indonesia",
    question: "Contoh kata serapan dari bahasa_inggris adalah...",
    options: ["Televisi", "Rumah", "Sawah", "Padi"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 214,
    category: "bahasa_indonesia",
    question: "Kata 'mempercantik' memiliki imbuhan...",
    options: ["me- dan -kan", "di- dan -kan", "pe- dan -an", "ber- dan -an"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 215,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang termasuk kalimat pasif adalah...",
    options: ["Ibu memasak nasi.", "Nasi dimasak oleh ibu.", "Ayah membeli koran.", "Mereka sedang makan."],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 216,
    category: "bahasa_indonesia",
    question: "Kalimat 'Andi membaca buku di perpustakaan' memiliki pola kalimat...",
    options: ["S-P-O", "S-P-K", "S-P-O-K", "S-P"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 217,
    category: "bahasa_indonesia",
    question: "Kata 'pengetahuan' terbentuk dari bentuk dasar...",
    options: ["Tahu", "Mengetahui", "Pengetahui", "Ketahuan"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 218,
    category: "bahasa_indonesia",
    question: "Tanda baca yang digunakan untuk mengakhiri kalimat tanya adalah...",
    options: ["Titik", "Koma", "Tanda tanya", "Tanda seru"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 219,
    category: "bahasa_indonesia",
    question: "Kata 'menyapu' berarti...",
    options: ["Kegiatan memasak", "Membersihkan lantai", "Mencuci piring", "Menulis di papan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 220,
    category: "bahasa_indonesia",
    question: "Kalimat 'Budi pergi ke sekolah setiap pagi.' termasuk jenis kalimat...",
    options: ["Perintah", "Berita", "Tanya", "Seru"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 221,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang termasuk kalimat seru adalah...",
    options: ["Wah, indah sekali pemandangan itu!", "Kamu sudah makan?", "Dia sedang tidur.", "Mereka bermain bola."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 222,
    category: "bahasa_indonesia",
    question: "Kata 'berlari' memiliki imbuhan...",
    options: ["me-", "ber-", "di-", "ter-"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 223,
    category: "bahasa_indonesia",
    question: "Kalimat 'Pohon itu tumbuh tinggi' memiliki predikat...",
    options: ["Pohon", "Itu", "Tumbuh", "Tinggi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 224,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang mengandung makna larangan adalah...",
    options: ["Jangan buang sampah sembarangan!", "Ayo kita makan!", "Kamu belajar ya.", "Budi sedang tidur."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 225,
    category: "bahasa_indonesia",
    question: "Paragraf yang berisi ajakan disebut paragraf...",
    options: ["Persuasi", "Deskripsi", "Narasi", "Eksposisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 226,
    category: "bahasa_indonesia",
    question: "Kata 'pemanasan' berasal dari kata dasar...",
    options: ["Panas", "Memanas", "Pemanas", "Dipanas"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 227,
    category: "bahasa_indonesia",
    question: "Kalimat 'Air sungai itu sangat jernih.' termasuk kalimat...",
    options: ["Berita", "Tanya", "Perintah", "Seru"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 228,
    category: "bahasa_indonesia",
    question: "Kalimat 'Ia memukul bola dengan keras' memiliki objek...",
    options: ["Ia", "Memukul", "Bola", "Keras"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 229,
    category: "bahasa_indonesia",
    question: "Kalimat 'Adik menangis karena jatuh' termasuk kalimat...",
    options: ["Majemuk", "Tunggal", "Pasif", "Tak langsung"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 230,
    category: "bahasa_indonesia",
    question: "Kata yang memiliki makna kebalikan disebut...",
    options: ["Antonim", "Sinonim", "Homofon", "Homonim"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 231,
    category: "bahasa_indonesia",
    question: "Kata 'rajin' bersinonim dengan...",
    options: ["Malas", "Ulet", "Lambat", "Santai"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 232,
    category: "bahasa_indonesia",
    question: "Kalimat 'Buku itu dibaca oleh Dina.' termasuk kalimat...",
    options: ["Aktif", "Pasif", "Majemuk", "Langsung"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 233,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang menggunakan kata depan dengan benar adalah...",
    options: ["Dia pergi ke pasar.", "Dia pergi di pasar.", "Dia pergi dari pasar.", "Dia pergi untuk pasar."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 234,
    category: "bahasa_indonesia",
    question: "Kata 'menggambar' termasuk kata kerja karena...",
    options: ["Menunjukkan benda", "Menunjukkan sifat", "Menunjukkan tindakan", "Menunjukkan tempat"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 235,
    category: "bahasa_indonesia",
    question: "Kalimat 'Siti membaca buku di taman setiap sore.' memiliki keterangan...",
    options: ["Siti", "Buku", "Di taman setiap sore", "Membaca"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 236,
    category: "bahasa_indonesia",
    question: "Kata 'penjual' memiliki imbuhan...",
    options: ["pe- dan -an", "pe- dan -ul", "pe- dan -l", "pe- dan -kan"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 237,
    category: "bahasa_indonesia",
    question: "Paragraf yang menceritakan pengalaman seseorang disebut teks...",
    options: ["Narasi", "Eksposisi", "Persuasi", "Deskripsi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 238,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang menggunakan ejaan tidak baku adalah...",
    options: ["Kami bersekolah setiap hari.", "Ayah bekerja dikantor.", "Ibu memasak di dapur.", "Mereka belajar bersama."],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 239,
    category: "bahasa_indonesia",
    question: "Kata 'mengajar' termasuk kata...",
    options: ["Benda", "Kerja", "Sifat", "Keterangan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 240,
    category: "bahasa_indonesia",
    question: "Kalimat 'Dia tidak hadir karena sakit.' termasuk kalimat...",
    options: ["Tunggal", "Majemuk sebab-akibat", "Majemuk setara", "Pasif"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 241,
    category: "bahasa_indonesia",
    question: "Kalimat 'Pekerjaan itu telah selesai.' mengandung kata...",
    options: ["Kata kerja", "Kata benda", "Kata sifat", "Kata bilangan"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 242,
    category: "bahasa_indonesia",
    question: "Kalimat 'Saya membeli buah, sayur, dan roti di pasar.' menggunakan tanda baca...",
    options: ["Titik", "Koma", "Tanda seru", "Tanda petik"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 243,
    category: "bahasa_indonesia",
    question: "Kalimat 'Anak itu berlari dengan cepat' termasuk kalimat...",
    options: ["Aktif", "Pasif", "Majemuk", "Tak langsung"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 244,
    category: "bahasa_indonesia",
    question: "Kata 'kebersihan' merupakan kata bentukan dari kata dasar...",
    options: ["Bersih", "Membersihkan", "Pembersih", "Berbersih"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 245,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang menggunakan imbuhan dengan benar adalah...",
    options: ["Dia menulis surat.", "Dia tulis surat.", "Dia ditulis surat.", "Dia menuliskan surat oleh dia."],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 246,
    category: "bahasa_indonesia",
    question: "Teks iklan biasanya bertujuan untuk...",
    options: ["Memberi informasi", "Membujuk pembaca", "Menjelaskan proses", "Menguraikan sebab-akibat"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 247,
    category: "bahasa_indonesia",
    question: "Teks laporan hasil observasi berisi...",
    options: ["Pendapat pribadi", "Hasil pengamatan", "Cerita fiksi", "Ajakan"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 248,
    category: "bahasa_indonesia",
    question: "Kata 'bermain' termasuk ke dalam jenis kata...",
    options: ["Benda", "Kerja", "Sifat", "Keterangan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 249,
    category: "bahasa_indonesia",
    question: "Kalimat berikut yang menggunakan kata baku adalah...",
    options: ["Saya menonton film di bioskop.", "Saya nonton film di bioskop.", "Saya nontonin film di bioskop.", "Saya liat film di bioskop."],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 250,
    category: "bahasa_indonesia",
    question: "Kalimat 'Pohon itu tumbuh di halaman rumah.' termasuk kalimat dengan pola...",
    options: ["S-P", "S-P-O", "S-P-K", "S-P-O-K"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },

  // ---------------- bahasa_inggris ----------------
  {
  id: 251,
  category: "bahasa_inggris",
  question: "Choose the correct form: She ____ to school every morning.",
  options: ["go", "goes", "going", "gone"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 252,
  category: "bahasa_inggris",
  question: "The opposite of 'expensive' is ____.",
  options: ["cheap", "costly", "valuable", "rich"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 253,
  category: "bahasa_inggris",
  question: "I ____ my homework last night.",
  options: ["do", "does", "did", "doing"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 254,
  category: "bahasa_inggris",
  question: "What is the plural form of 'child'?",
  options: ["childs", "childes", "children", "childrens"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 255,
  category: "bahasa_inggris",
  question: "She is taller ____ her sister.",
  options: ["then", "than", "that", "to"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 256,
  category: "bahasa_inggris",
  question: "We ____ TV when the power went off.",
  options: ["watch", "watched", "were watching", "have watched"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 257,
  category: "bahasa_inggris",
  question: "They have lived here ____ 2010.",
  options: ["for", "since", "in", "at"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 258,
  category: "bahasa_inggris",
  question: "The past tense of 'run' is ____.",
  options: ["runned", "ran", "run", "running"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 259,
  category: "bahasa_inggris",
  question: "Complete the sentence: 'If it rains, we ____ stay at home.'",
  options: ["will", "would", "was", "is"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 260,
  category: "bahasa_inggris",
  question: "What time ____ you go to bed?",
  options: ["do", "does", "did", "doing"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 261,
  category: "bahasa_inggris",
  question: "Find the synonym of 'happy'.",
  options: ["sad", "joyful", "angry", "upset"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 262,
  category: "bahasa_inggris",
  question: "She is interested ____ art.",
  options: ["on", "in", "at", "to"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 263,
  category: "bahasa_inggris",
  question: "Choose the correct spelling:",
  options: ["recieve", "receive", "receeve", "receve"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 264,
  category: "bahasa_inggris",
  question: "I haven’t seen him ____ Monday.",
  options: ["since", "for", "during", "at"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 265,
  category: "bahasa_inggris",
  question: "Which one is a noun?",
  options: ["quickly", "happy", "book", "run"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 266,
  category: "bahasa_inggris",
  question: "‘She can’t come because she is sick.’ — The word 'because' shows a ____ relationship.",
  options: ["contrast", "reason", "time", "result"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 267,
  category: "bahasa_inggris",
  question: "Choose the correct sentence:",
  options: ["He don’t like tea.", "He doesn’t like tea.", "He didn’t likes tea.", "He not like tea."],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 268,
  category: "bahasa_inggris",
  question: "The superlative form of 'good' is ____.",
  options: ["better", "best", "goodest", "most good"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 269,
  category: "bahasa_inggris",
  question: "He usually ____ his homework in the evening.",
  options: ["do", "does", "did", "done"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 270,
  category: "bahasa_inggris",
  question: "Find the antonym of 'big'.",
  options: ["small", "large", "huge", "giant"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 271,
  category: "bahasa_inggris",
  question: "My father ____ to work by car every day.",
  options: ["go", "goes", "going", "gone"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 272,
  category: "bahasa_inggris",
  question: "The past tense of 'eat' is ____.",
  options: ["eated", "eats", "ate", "eating"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 273,
  category: "bahasa_inggris",
  question: "‘He runs faster than me.’ — The word 'faster' is a ____ adjective.",
  options: ["positive", "comparative", "superlative", "possessive"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 274,
  category: "bahasa_inggris",
  question: "We ____ a movie when the phone rang.",
  options: ["watch", "watched", "were watching", "watching"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 275,
  category: "bahasa_inggris",
  question: "Choose the correct sentence:",
  options: ["She can sings.", "She can sing.", "She cans sing.", "She can to sing."],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 276,
  category: "bahasa_inggris",
  question: "‘There are many ____ in the garden.’",
  options: ["flower", "flowers", "flor", "flours"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 277,
  category: "bahasa_inggris",
  question: "Complete: ‘The book is ____ the table.’",
  options: ["in", "on", "at", "under"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 278,
  category: "bahasa_inggris",
  question: "‘Let’s go to the library.’ The word ‘Let’s’ means ____.",
  options: ["Let us", "Let he", "Let me", "Let they"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 279,
  category: "bahasa_inggris",
  question: "Which word has a different vowel sound?",
  options: ["cat", "hat", "car", "bat"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 280,
  category: "bahasa_inggris",
  question: "The correct question is: ____ you like pizza?",
  options: ["Do", "Does", "Is", "Are"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 281,
  category: "bahasa_inggris",
  question: "‘He didn’t come yesterday.’ The word ‘didn’t’ means ____.",
  options: ["did not", "do not", "does not", "was not"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 282,
  category: "bahasa_inggris",
  question: "What is the past participle of 'write'?",
  options: ["writed", "wrote", "written", "writing"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 283,
  category: "bahasa_inggris",
  question: "‘I have already eaten.’ — The tense used is ____.",
  options: ["simple past", "present perfect", "past continuous", "future simple"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 284,
  category: "bahasa_inggris",
  question: "‘Don’t make noise!’ means ____.",
  options: ["Be quiet", "Talk loudly", "Sing", "Play music"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 285,
  category: "bahasa_inggris",
  question: "Choose the correct pronoun: ‘This is ____ book.’",
  options: ["me", "mine", "my", "I"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 286,
  category: "bahasa_inggris",
  question: "‘He is a doctor.’ — The article ‘a’ is used because ____.",
  options: ["it’s plural", "it starts with vowel sound", "it’s singular and begins with consonant sound", "it’s possessive"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 287,
  category: "bahasa_inggris",
  question: "‘My mother is cooking.’ The tense used is ____.",
  options: ["simple present", "present continuous", "past tense", "future tense"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 288,
  category: "bahasa_inggris",
  question: "The synonym of ‘begin’ is ____.",
  options: ["start", "end", "finish", "stop"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 289,
  category: "bahasa_inggris",
  question: "‘The weather is very hot today.’ — The opposite of ‘hot’ is ____.",
  options: ["warm", "cool", "cold", "freezing"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 290,
  category: "bahasa_inggris",
  question: "Choose the correct sentence:",
  options: ["She don’t plays guitar.", "She doesn’t play guitar.", "She not play guitar.", "She isn’t play guitar."],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 291,
  category: "bahasa_inggris",
  question: "‘We have lived here for ten years.’ The word ‘for’ shows ____.",
  options: ["reason", "duration", "place", "purpose"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 292,
  category: "bahasa_inggris",
  question: "‘Can you help me?’ — The sentence is a ____.",
  options: ["statement", "question", "command", "exclamation"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 293,
  category: "bahasa_inggris",
  question: "‘Please close the door.’ — The word ‘please’ makes the sentence more ____.",
  options: ["rude", "polite", "angry", "strong"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 294,
  category: "bahasa_inggris",
  question: "‘Where ____ you born?’",
  options: ["is", "was", "were", "are"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 295,
  category: "bahasa_inggris",
  question: "‘Don’t forget to bring your umbrella.’ — The function of this sentence is to ____.",
  options: ["invite", "advise", "warn", "promise"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 296,
  category: "bahasa_inggris",
  question: "Choose the correct response: ‘How are you?’",
  options: ["I’m fine, thank you.", "Yes, I am.", "I’m go.", "You are fine."],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 297,
  category: "bahasa_inggris",
  question: "‘It’s raining. You should take an umbrella.’ — The word ‘should’ expresses ____.",
  options: ["necessity", "advice", "ability", "permission"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 298,
  category: "bahasa_inggris",
  question: "‘She speaks English very well.’ — The word ‘well’ is a ____.",
  options: ["noun", "adjective", "adverb", "verb"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 299,
  category: "bahasa_inggris",
  question: "‘Let’s go home.’ — The contraction ‘Let’s’ stands for ____.",
  options: ["Let is", "Let us", "Lets", "Let has"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 300,
  category: "bahasa_inggris",
  question: "‘She will call you tomorrow.’ — The word ‘will’ shows ____ tense.",
  options: ["past", "present", "future", "perfect"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},

// atronomi 

{
  id: 301,
  category: "astronomi",
  question: "Planet terbesar di tata surya adalah...",
  options: ["Bumi", "Jupiter", "Saturnus", "Neptunus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 302,
  category: "astronomi",
  question: "Planet terdekat dengan Matahari adalah...",
  options: ["Venus", "Merkurius", "Bumi", "Mars"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 303,
  category: "astronomi",
  question: "Urutan planet dari Matahari dimulai dari...",
  options: ["Bumi", "Merkurius", "Mars", "Venus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 304,
  category: "astronomi",
  question: "Planet yang dikenal sebagai 'planet merah' adalah...",
  options: ["Venus", "Mars", "Saturnus", "Uranus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 305,
  category: "astronomi",
  question: "Saturnus terkenal karena memiliki...",
  options: ["Lautan luas", "Cincin", "Bulan terbesar", "Warna merah"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 306,
  category: "astronomi",
  question: "Bintang terdekat dari Bumi adalah...",
  options: ["Proxima Centauri", "Sirius", "Matahari", "Betelgeuse"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 307,
  category: "astronomi",
  question: "Bulan mengelilingi...",
  options: ["Matahari", "Bumi", "Mars", "Venus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 308,
  category: "astronomi",
  question: "Gerhana bulan terjadi ketika...",
  options: [
    "Bulan berada di antara Matahari dan Bumi",
    "Bumi berada di antara Matahari dan Bulan",
    "Matahari berada di antara Bumi dan Bulan",
    "Bulan menutupi Matahari"
  ],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 309,
  category: "astronomi",
  question: "Gerhana matahari terjadi ketika...",
  options: [
    "Bulan berada di antara Matahari dan Bumi",
    "Bumi berada di antara Matahari dan Bulan",
    "Bulan tertutup bayangan Bumi",
    "Matahari menghilang di balik Bumi"
  ],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 310,
  category: "astronomi",
  question: "Planet yang memiliki cincin paling mencolok adalah...",
  options: ["Neptunus", "Saturnus", "Uranus", "Jupiter"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 311,
  category: "astronomi",
  question: "Nama galaksi tempat Bumi berada adalah...",
  options: ["Andromeda", "Bimasakti", "Sombrero", "Whirlpool"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 312,
  category: "astronomi",
  question: "Planet yang memiliki banyak badai besar adalah...",
  options: ["Mars", "Jupiter", "Venus", "Saturnus"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 313,
  category: "astronomi",
  question: "Bulan mengelilingi Bumi dalam waktu sekitar...",
  options: ["7 hari", "14 hari", "27 hari", "30 hari"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 314,
  category: "astronomi",
  question: "Planet yang memiliki suhu terpanas di tata surya adalah...",
  options: ["Merkurius", "Venus", "Mars", "Jupiter"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 315,
  category: "astronomi",
  question: "Bintang yang meledak disebut...",
  options: ["Nebula", "Supernova", "Meteorit", "Komet"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 316,
  category: "astronomi",
  question: "Tata surya terbentuk sekitar ... tahun yang lalu.",
  options: ["1 juta", "4,6 miliar", "10 juta", "1 miliar"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 317,
  category: "astronomi",
  question: "Planet yang dikenal memiliki rotasi paling cepat adalah...",
  options: ["Jupiter", "Saturnus", "Mars", "Bumi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 318,
  category: "astronomi",
  question: "Benda langit yang memantulkan cahaya Matahari adalah...",
  options: ["Bintang", "Bulan", "Nebula", "Matahari"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 319,
  category: "astronomi",
  question: "Komet tersusun dari...",
  options: ["Batu dan logam", "Es dan debu", "Gas dan air", "Besi dan karbon"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 320,
  category: "astronomi",
  question: "Planet terkecil di tata surya adalah...",
  options: ["Mars", "Merkurius", "Venus", "Neptunus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 321,
  category: "astronomi",
  question: "Urutan fase Bulan yang benar adalah...",
  options: [
    "Bulan baru – Purnama – Bulan separuh",
    "Bulan baru – Bulan separuh – Purnama",
    "Purnama – Bulan baru – Bulan sabit",
    "Bulan sabit – Purnama – Bulan baru"
  ],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 322,
  category: "astronomi",
  question: "Planet yang memiliki warna kebiruan karena gas metana adalah...",
  options: ["Saturnus", "Uranus", "Neptunus", "Jupiter"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 323,
  category: "astronomi",
  question: "Benda langit yang mengorbit planet disebut...",
  options: ["Satelit", "Asteroid", "Komet", "Bintang"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 324,
  category: "astronomi",
  question: "Bulan tidak memancarkan cahaya sendiri, karena...",
  options: [
    "Tidak punya energi",
    "Hanya memantulkan cahaya Matahari",
    "Terlalu jauh dari Bumi",
    "Tertutup atmosfer"
  ],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 325,
  category: "astronomi",
  question: "Jumlah planet di tata surya setelah Pluto tidak dianggap planet adalah...",
  options: ["8", "9", "7", "10"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 326,
  category: "astronomi",
  question: "Nama lain dari Bima Sakti dalam bahasa_inggris adalah...",
  options: ["Milky Way", "Galaxy Star", "Space Line", "Solar Path"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 327,
  category: "astronomi",
  question: "Planet yang dikenal memiliki banyak bulan adalah...",
  options: ["Mars", "Jupiter", "Venus", "Merkurius"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 328,
  category: "astronomi",
  question: "Bintang yang sangat besar dan panas biasanya berwarna...",
  options: ["Merah", "Kuning", "Putih kebiruan", "Oranye"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 329,
  category: "astronomi",
  question: "Orbit adalah...",
  options: [
    "Jarak antara dua planet",
    "Lintasan benda langit saat mengelilingi benda lain",
    "Arah pergerakan angin di luar angkasa",
    "Lapisan atmosfer luar Bumi"
  ],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 330,
  category: "astronomi",
  question: "Planet yang paling jauh dari Matahari adalah...",
  options: ["Neptunus", "Uranus", "Pluto", "Saturnus"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 331,
  category: "astronomi",
  question: "Galaksi Andromeda berada paling dekat dengan...",
  options: ["Galaksi Triangulum", "Galaksi Bimasakti", "Galaksi Sombrero", "Galaksi M87"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 332,
  category: "astronomi",
  question: "Bintang jatuh sebenarnya adalah...",
  options: ["Bintang yang meledak", "Meteoroid yang terbakar di atmosfer", "Komet kecil", "Satelit alami"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 333,
  category: "astronomi",
  question: "Lapisan atmosfer yang paling dekat dengan permukaan Bumi disebut...",
  options: ["Stratosfer", "Troposfer", "Mesosfer", "Termosfer"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 334,
  category: "astronomi",
  question: "Matahari menghasilkan energi melalui proses...",
  options: ["Fusi nuklir", "Fisi nuklir", "Pembakaran kimia", "Reaksi gravitasi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 335,
  category: "astronomi",
  question: "Planet yang disebut 'raksasa es' adalah...",
  options: ["Uranus dan Neptunus", "Mars dan Bumi", "Jupiter dan Saturnus", "Venus dan Merkurius"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 336,
  category: "astronomi",
  question: "Periode revolusi Bumi mengelilingi Matahari adalah sekitar...",
  options: ["24 jam", "30 hari", "365 hari", "12 jam"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 337,
  category: "astronomi",
  question: "Bintang lahir dari awan gas dan debu yang disebut...",
  options: ["Meteor", "Nebula", "Komet", "Satelit"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 338,
  category: "astronomi",
  question: "Rotasi Bumi menyebabkan terjadinya...",
  options: ["Siang dan malam", "Musim", "Gerhana", "Hujan meteor"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 339,
  category: "astronomi",
  question: "Revolusi Bumi menyebabkan terjadinya...",
  options: ["Gerhana", "Siang malam", "Perubahan musim", "Angin"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 340,
  category: "astronomi",
  question: "Planet yang tidak memiliki satelit alami adalah...",
  options: ["Merkurius dan Venus", "Mars dan Bumi", "Saturnus dan Jupiter", "Uranus dan Neptunus"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 341,
  category: "astronomi",
  question: "Asteroid umumnya berada di antara orbit planet...",
  options: ["Bumi dan Mars", "Mars dan Jupiter", "Saturnus dan Uranus", "Venus dan Merkurius"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 342,
  category: "astronomi",
  question: "Gerakan semu tahunan Matahari disebabkan oleh...",
  options: ["Rotasi Bumi", "Revolusi Bumi", "Gerak Bulan", "Gerak planet"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 343,
  category: "astronomi",
  question: "Bulan purnama terjadi ketika posisi Bulan berada...",
  options: ["Sejajar dengan Matahari", "Berada di belakang Bumi", "Di antara Bumi dan Matahari", "Tepat di atas kutub Bumi"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 344,
  category: "astronomi",
  question: "Fenomena aurora sering terjadi di daerah...",
  options: ["Khatulistiwa", "Kutub", "Pegunungan", "Laut"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 345,
  category: "astronomi",
  question: "Benda langit yang disebut ‘planet kerdil’ adalah...",
  options: ["Pluto", "Merkurius", "Neptunus", "Ceres"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 346,
  category: "astronomi",
  question: "Nama satelit alami terbesar milik Jupiter adalah...",
  options: ["Europa", "Io", "Ganymede", "Callisto"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 347,
  category: "astronomi",
  question: "Alat untuk mengamati benda langit disebut...",
  options: ["Teleskop", "Mikroskop", "Periskop", "Barometer"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 348,
  category: "astronomi",
  question: "Jumlah bulan yang dimiliki Bumi adalah...",
  options: ["1", "2", "3", "4"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 349,
  category: "astronomi",
  question: "Planet yang memiliki arah rotasi berlawanan dengan planet lain adalah...",
  options: ["Venus", "Bumi", "Mars", "Saturnus"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 350,
  category: "astronomi",
  question: "Tata surya merupakan bagian kecil dari...",
  options: ["Bulan", "Galaksi", "Nebula", "Asteroid"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
}
];


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
      const response = await fetch(`/api/questions?category=${categoryId}&limit=50`)
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
                Pilih Mata Pelajaran
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gray-800">
                  Pilih Kategori Quiz
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pilih Mata Pelajaran Favoritmu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300  border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center pb-3">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800">{category.name}</CardTitle>
                      <CardDescription>Uji Pengetahuanmu tentang {category.name.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={() => startGame(category.id)}
                        className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                      >
                        Mulai Quiz
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* <FeaturesSection /> */}
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
                  Papan Skor
                </span>
              </h2>
              <p className="text-xl text-gray-600">Urutan Nilai Terbaik dari Hasil Quiz</p>
            </div>

            <div className="grid gap-4 mb-8">
              {leaderboard.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-500">Belum ada yang submit skor, Ayo Mulai!</p>
                    <Button 
                      onClick={() => {
                        const element = document.getElementById('play')
                        if (element) element.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="mt-4 bg-gray-800 hover:bg-gray-900"
                    >
                      Mulai Bermain
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

        {/* <Footer /> */}
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