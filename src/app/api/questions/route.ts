import { NextRequest, NextResponse } from 'next/server'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
}

const allQuestions: Question[] = [
  // ---------------- MATEMATIKA ----------------
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

  // ---------------- FISIKA ----------------
  {
    id: 51,
    category: "Fisika",
    question: "Besaran yang memiliki satuan meter per sekon (m/s) adalah...",
    options: ["Gaya", "Kecepatan", "Massa", "Energi"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 52,
    category: "Fisika",
    question: "Alat untuk mengukur kuat arus listrik adalah...",
    options: ["Voltmeter", "Amperemeter", "Ohmmeter", "Termometer"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 53,
    category: "Fisika",
    question: "Satuan SI untuk gaya adalah...",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 54,
    category: "Fisika",
    question: "Benda dikatakan bergerak jika...",
    options: ["Benda diam di tempat", "Posisi benda berubah terhadap acuan", "Benda berpindah tapi jarak tetap", "Benda diam relatif terhadap acuan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 55,
    category: "Fisika",
    question: "Energi yang dimiliki benda karena gerak disebut...",
    options: ["Energi potensial", "Energi kinetik", "Energi panas", "Energi listrik"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 56,
    category: "Fisika",
    question: "Rumus untuk mencari gaya adalah...",
    options: ["F = m × a", "F = m ÷ a", "F = a ÷ m", "F = m + a"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 57,
    category: "Fisika",
    question: "Jika gaya 20 N bekerja pada benda bermassa 4 kg, percepatan benda adalah...",
    options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 58,
    category: "Fisika",
    question: "Gaya gesek selalu bekerja...",
    options: ["Searah dengan gerak benda", "Berlawanan arah dengan gerak benda", "Tegak lurus arah gerak", "Tidak berpengaruh"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 59,
    category: "Fisika",
    question: "Tekanan berbanding terbalik dengan...",
    options: ["Gaya", "Luas bidang tekan", "Massa", "Volume"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 60,
    category: "Fisika",
    question: "Satuan tekanan dalam SI adalah...",
    options: ["Newton", "Joule", "Pascal", "Ohm"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 61,
    category: "Fisika",
    question: "Bunyi tidak dapat merambat melalui...",
    options: ["Padat", "Cair", "Gas", "Ruang hampa"],
    correctAnswer: 3,
    difficulty: "medium",
    points: 10
  },
  {
    id: 62,
    category: "Fisika",
    question: "Cahaya termasuk gelombang...",
    options: ["Mekanik", "Longitudinal", "Transversal", "Bunyi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 63,
    category: "Fisika",
    question: "Ketika cahaya melewati prisma, ia mengalami...",
    options: ["Refleksi", "Refraksi", "Difraksi", "Interferensi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 64,
    category: "Fisika",
    question: "Bayangan pada cermin datar bersifat...",
    options: ["Nyata dan terbalik", "Maya dan tegak", "Nyata dan tegak", "Lebih kecil dari benda"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 65,
    category: "Fisika",
    question: "Alat untuk mengukur massa jenis benda cair adalah...",
    options: ["Barometer", "Hidrometer", "Manometer", "Termometer"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 66,
    category: "Fisika",
    question: "Sumber energi terbesar di Bumi adalah...",
    options: ["Matahari", "Minyak bumi", "Batu bara", "Angin"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 67,
    category: "Fisika",
    question: "Perpindahan panas secara langsung melalui zat padat disebut...",
    options: ["Konduksi", "Konveksi", "Radiasi", "Transmisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 68,
    category: "Fisika",
    question: "Termometer digunakan untuk mengukur...",
    options: ["Panjang", "Waktu", "Suhu", "Massa"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 69,
    category: "Fisika",
    question: "Perubahan wujud dari padat ke gas disebut...",
    options: ["Menyublim", "Mengembun", "Meleleh", "Membeku"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 70,
    category: "Fisika",
    question: "Satuan energi dalam SI adalah...",
    options: ["Joule", "Watt", "Newton", "Ampere"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 71,
    category: "Fisika",
    question: "Hambatan listrik dilambangkan dengan huruf...",
    options: ["R", "I", "V", "P"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 72,
    category: "Fisika",
    question: "Bunyi yang memiliki frekuensi di atas 20.000 Hz disebut...",
    options: ["Infrasonik", "Audiosonik", "Ultrasonik", "Supersonik"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 73,
    category: "Fisika",
    question: "Salah satu contoh energi potensial adalah...",
    options: ["Batu di atas tebing", "Mobil yang melaju", "Kipas yang berputar", "Lampu menyala"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 74,
    category: "Fisika",
    question: "Gaya gravitasi ditemukan oleh...",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "James Watt"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 75,
    category: "Fisika",
    question: "Arus listrik mengalir dari...",
    options: ["Kutub negatif ke positif", "Kutub positif ke negatif", "Searah medan listrik", "Tidak tentu arah"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 76,
    category: "Fisika",
    question: "Satuan daya listrik adalah...",
    options: ["Volt", "Watt", "Ampere", "Joule"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 77,
    category: "Fisika",
    question: "Jika sebuah lampu 40 W dinyalakan selama 2 jam, energi yang digunakan adalah...",
    options: ["40 J", "80 J", "288.000 J", "120.000 J"],
    correctAnswer: 2,
    difficulty: "hard",
    points: 15
  },
  {
    id: 78,
    category: "Fisika",
    question: "Kaca pembesar termasuk jenis lensa...",
    options: ["Cekung", "Cembung", "Datar", "Silinder"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 79,
    category: "Fisika",
    question: "Sifat bayangan pada lensa cembung dapat bersifat...",
    options: ["Selalu maya", "Selalu nyata", "Tergantung jarak benda", "Selalu tegak"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 80,
    category: "Fisika",
    question: "Besaran turunan berikut adalah...",
    options: ["Massa", "Waktu", "Kecepatan", "Panjang"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 81,
    category: "Fisika",
    question: "Besaran pokok yang satuannya kelvin digunakan untuk mengukur...",
    options: ["Panjang", "Massa", "Suhu", "Waktu"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 82,
    category: "Fisika",
    question: "Alat yang digunakan untuk mengukur tekanan udara adalah...",
    options: ["Termometer", "Manometer", "Barometer", "Altimeter"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 83,
    category: "Fisika",
    question: "Rumus tekanan adalah...",
    options: ["P = F/A", "P = A/F", "P = m × g", "P = F × A"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 84,
    category: "Fisika",
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
    category: "Fisika",
    question: "Satuan frekuensi dalam SI adalah...",
    options: ["Hertz", "Joule", "Pascal", "Watt"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 86,
    category: "Fisika",
    question: "Gelombang yang arah rambatnya sejajar dengan arah getarnya disebut...",
    options: ["Transversal", "Longitudinal", "Stasioner", "Elektromagnetik"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 87,
    category: "Fisika",
    question: "Satuan hambatan listrik dalam SI adalah...",
    options: ["Volt", "Ohm", "Ampere", "Joule"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 88,
    category: "Fisika",
    question: "Hukum Ohm dinyatakan dengan rumus...",
    options: ["V = I × R", "P = V × I", "R = V × I", "I = R × V"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 89,
    category: "Fisika",
    question: "Jika tegangan 12 V dan arus 2 A, maka hambatannya adalah...",
    options: ["6 Ohm", "12 Ohm", "24 Ohm", "2 Ohm"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 90,
    category: "Fisika",
    question: "Energi listrik dapat diubah menjadi energi panas pada alat...",
    options: ["Lampu pijar", "Kipas angin", "Motor listrik", "Radio"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 91,
    category: "Fisika",
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
    category: "Fisika",
    question: "Perpindahan panas tanpa zat perantara disebut...",
    options: ["Konduksi", "Konveksi", "Radiasi", "Refleksi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 93,
    category: "Fisika",
    question: "Ketika logam dipanaskan, volumenya akan...",
    options: ["Tetap", "Mengecil", "Membesar", "Menghilang"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 94,
    category: "Fisika",
    question: "Fenomena pembiasan menyebabkan pensil dalam air terlihat...",
    options: ["Lebih pendek", "Lebih panjang", "Patah", "Tidak terlihat"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 95,
    category: "Fisika",
    question: "Cermin yang digunakan pada mobil untuk melihat area luas adalah...",
    options: ["Cermin datar", "Cermin cembung", "Cermin cekung", "Kaca pembesar"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 96,
    category: "Fisika",
    question: "Energi potensial gravitasi bergantung pada...",
    options: ["Massa dan kecepatan", "Massa dan ketinggian", "Luas dan tekanan", "Waktu dan gaya"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 97,
    category: "Fisika",
    question: "Rumus energi potensial gravitasi adalah...",
    options: ["Ep = m × g × h", "Ep = m × v²", "Ep = F × s", "Ep = I × V"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 98,
    category: "Fisika",
    question: "Ketika benda jatuh bebas, energi kinetiknya akan...",
    options: ["Tetap", "Berkurang", "Bertambah", "Hilang"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 99,
    category: "Fisika",
    question: "Gelombang bunyi termasuk jenis gelombang...",
    options: ["Transversal", "Longitudinal", "Elektromagnetik", "Stasioner"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 100,
    category: "Fisika",
    question: "Satuan percepatan gravitasi adalah...",
    options: ["m/s", "m/s²", "m²/s", "m²/s²"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },

  // ---------------- KIMIA ----------------
  {
    id: 101,
    category: "Kimia",
    question: "Air (H₂O) termasuk jenis zat...",
    options: ["Unsur", "Senyawa", "Campuran", "Logam"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 102,
    category: "Kimia",
    question: "Unsur yang paling banyak di udara adalah...",
    options: ["Oksigen", "Nitrogen", "Karbon dioksida", "Hidrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 103,
    category: "Kimia",
    question: "Rumus kimia garam dapur adalah...",
    options: ["NaOH", "NaCl", "KCl", "HCl"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 104,
    category: "Kimia",
    question: "Senyawa yang terbentuk dari unsur karbon dan oksigen adalah...",
    options: ["CO₂", "NaCl", "H₂O", "NH₃"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 105,
    category: "Kimia",
    question: "Unsur yang menjadi bahan utama pembentuk baja adalah...",
    options: ["Tembaga", "Aluminium", "Besi", "Perak"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 106,
    category: "Kimia",
    question: "Perubahan wujud dari padat menjadi cair disebut...",
    options: ["Menguap", "Membeku", "Meleleh", "Mengkristal"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 107,
    category: "Kimia",
    question: "Proses penguapan yang terjadi pada seluruh bagian zat cair disebut...",
    options: ["Menguap", "Mendidih", "Menyublim", "Mengkristal"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 108,
    category: "Kimia",
    question: "Perubahan kimia ditandai oleh...",
    options: ["Perubahan warna", "Perubahan wujud sementara", "Tidak ada zat baru", "Zat kembali seperti semula"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 109,
    category: "Kimia",
    question: "Perkaratan pada besi merupakan contoh dari...",
    options: ["Perubahan fisika", "Perubahan kimia", "Sublimasi", "Kondensasi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 110,
    category: "Kimia",
    question: "Zat yang dapat menetralkan asam adalah...",
    options: ["Air", "Basa", "Garam", "Gas"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 111,
    category: "Kimia",
    question: "Zat dengan pH kurang dari 7 disebut...",
    options: ["Asam", "Basa", "Netral", "Garam"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 112,
    category: "Kimia",
    question: "Zat dengan pH lebih dari 7 disebut...",
    options: ["Asam", "Basa", "Netral", "Asam lemah"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 113,
    category: "Kimia",
    question: "Campuran air dan minyak termasuk campuran...",
    options: ["Homogen", "Heterogen", "Padat", "Gas"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 114,
    category: "Kimia",
    question: "Larutan gula dalam air adalah contoh campuran...",
    options: ["Homogen", "Heterogen", "Gas", "Padat"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 115,
    category: "Kimia",
    question: "Zat yang dapat menghantarkan listrik disebut...",
    options: ["Isolator", "Konduktor", "Larutan", "Senyawa"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 116,
    category: "Kimia",
    question: "Zat yang menyebabkan karat pada besi adalah...",
    options: ["Karbon dioksida", "Oksigen dan air", "Hidrogen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 117,
    category: "Kimia",
    question: "Proses fotosintesis menghasilkan...",
    options: ["Oksigen dan air", "Oksigen dan glukosa", "Karbon dioksida dan air", "Air dan energi"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 118,
    category: "Kimia",
    question: "Unsur yang paling ringan adalah...",
    options: ["Helium", "Hidrogen", "Oksigen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 119,
    category: "Kimia",
    question: "Zat yang dapat mempercepat reaksi kimia tanpa ikut bereaksi disebut...",
    options: ["Katalis", "Reaktan", "Produk", "Pelarut"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 120,
    category: "Kimia",
    question: "Air kapur menjadi keruh bila dilewati gas CO₂ karena terbentuk...",
    options: ["Garam", "Endapan", "Buih", "Asam"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 121,
    category: "Kimia",
    question: "Unsur dengan simbol Fe adalah...",
    options: ["Fluorin", "Fosfor", "Besi", "Ferium"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 122,
    category: "Kimia",
    question: "Unsur dengan simbol Cu adalah...",
    options: ["Kalsium", "Kromium", "Karbon", "Tembaga"],
    correctAnswer: 3,
    difficulty: "easy",
    points: 5
  },
  {
    id: 123,
    category: "Kimia",
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
    category: "Kimia",
    question: "Zat yang digunakan untuk memutihkan pakaian adalah...",
    options: ["Alkohol", "Klorin", "Amonia", "Aseton"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 125,
    category: "Kimia",
    question: "Zat yang terkandung dalam cuka adalah...",
    options: ["Asam asetat", "Asam klorida", "Asam sulfat", "Asam nitrat"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 126,
    category: "Kimia",
    question: "Gas yang menyebabkan efek rumah kaca adalah...",
    options: ["Oksigen", "Karbon dioksida", "Hidrogen", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 127,
    category: "Kimia",
    question: "Zat yang dapat mengubah warna lakmus merah menjadi biru adalah...",
    options: ["Asam", "Basa", "Garam", "Air"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 128,
    category: "Kimia",
    question: "Gas yang diperlukan untuk pembakaran adalah...",
    options: ["Hidrogen", "Oksigen", "Karbon dioksida", "Nitrogen"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 129,
    category: "Kimia",
    question: "Gas yang dihasilkan pada proses fotosintesis adalah...",
    options: ["Oksigen", "Karbon dioksida", "Hidrogen", "Nitrogen"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 130,
    category: "Kimia",
    question: "Campuran pasir dan air dapat dipisahkan dengan cara...",
    options: ["Filtrasi", "Destilasi", "Evaporasi", "Kristalisasi"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 131,
    category: "Kimia",
    question: "Destilasi digunakan untuk memisahkan campuran berdasarkan...",
    options: ["Perbedaan titik didih", "Perbedaan warna", "Perbedaan massa jenis", "Perbedaan bentuk"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 132,
    category: "Kimia",
    question: "Larutan asam dapat mengubah lakmus biru menjadi...",
    options: ["Merah", "Hijau", "Kuning", "Tidak berubah"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 133,
    category: "Kimia",
    question: "Zat yang mengandung atom karbon disebut...",
    options: ["Organik", "Anorganik", "Logam", "Gas mulia"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 134,
    category: "Kimia",
    question: "Zat yang dapat melarutkan zat lain disebut...",
    options: ["Pelarut", "Terlarut", "Reaktan", "Katalis"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 135,
    category: "Kimia",
    question: "Air murni merupakan contoh zat...",
    options: ["Campuran", "Senyawa", "Unsur", "Larutan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 136,
    category: "Kimia",
    question: "Proses pembentukan karat disebut...",
    options: ["Oksidasi", "Reduksi", "Netralisasi", "Destilasi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 137,
    category: "Kimia",
    question: "Hidrogen memiliki jumlah atom sebanyak...",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 138,
    category: "Kimia",
    question: "Perubahan air menjadi es merupakan contoh perubahan...",
    options: ["Kimia", "Fisis", "Radiasi", "Katalisis"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 139,
    category: "Kimia",
    question: "Zat yang memiliki massa tetapi tidak memiliki bentuk tetap disebut...",
    options: ["Cair", "Padat", "Gas", "Plasma"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 140,
    category: "Kimia",
    question: "Asap kendaraan terutama mengandung gas...",
    options: ["CO₂", "CO", "H₂", "O₃"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
  id: 141,
  category: "Kimia",
  question: "Bahan bakar yang ramah lingkungan dan dihasilkan dari tumbuhan disebut...",
  options: ["Bensin", "Solar", "Bioetanol", "Minyak tanah"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 142,
  category: "Kimia",
  question: "Unsur yang digunakan untuk mengisi balon udara karena ringan adalah...",
  options: ["Oksigen", "Hidrogen", "Helium", "Nitrogen"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 143,
  category: "Kimia",
  question: "Bahan kimia dalam baterai yang dapat mencemari lingkungan adalah...",
  options: ["Kalsium", "Merkuri", "Zat warna", "Amonia"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 144,
  category: "Kimia",
  question: "Proses pemisahan campuran padat dan cair dengan penyaringan disebut...",
  options: ["Destilasi", "Filtrasi", "Kristalisasi", "Sublimasi"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 145,
  category: "Kimia",
  question: "Larutan yang dapat menghantarkan arus listrik disebut...",
  options: ["Elektrolit", "Non-elektrolit", "Isolator", "Konduktor"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 146,
  category: "Kimia",
  question: "Proses perubahan gas menjadi cair disebut...",
  options: ["Mengkristal", "Meleleh", "Mengembun", "Menyublim"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 147,
  category: "Kimia",
  question: "Zat kimia yang digunakan untuk mensterilkan air kolam renang adalah...",
  options: ["Klorin", "Amonia", "Oksigen", "Karbon dioksida"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 148,
  category: "Kimia",
  question: "Perubahan zat padat langsung menjadi gas disebut...",
  options: ["Menguap", "Sublimasi", "Mengembun", "Meleleh"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 149,
  category: "Kimia",
  question: "Gas yang membuat soda memiliki gelembung adalah...",
  options: ["Oksigen", "Hidrogen", "Karbon dioksida", "Nitrogen"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 150,
  category: "Kimia",
  question: "Bahan yang digunakan sebagai bahan baku pupuk urea adalah...",
  options: ["Amonia", "Karbon dioksida", "Nitrogen", "Metana"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},

  // ---------------- SEJARAH ----------------
  {
  id: 151,
  category: "Sejarah",
  question: "Proklamasi kemerdekaan Indonesia dibacakan pada tanggal...",
  options: ["17 Agustus 1945", "10 November 1945", "1 Juni 1945", "20 Mei 1908"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 152,
  category: "Sejarah",
  question: "Teks proklamasi kemerdekaan Indonesia diketik oleh...",
  options: ["Sukarno", "Moh. Hatta", "Sayuti Melik", "Ahmad Subardjo"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 153,
  category: "Sejarah",
  question: "Tokoh pendiri Budi Utomo adalah...",
  options: ["Dr. Soetomo", "Ki Hajar Dewantara", "HOS Tjokroaminoto", "Moh. Yamin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 154,
  category: "Sejarah",
  question: "Budi Utomo berdiri pada tahun...",
  options: ["1905", "1908", "1910", "1928"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 155,
  category: "Sejarah",
  question: "Sumpah Pemuda diikrarkan pada tanggal...",
  options: ["20 Mei 1908", "28 Oktober 1928", "17 Agustus 1945", "10 November 1945"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 156,
  category: "Sejarah",
  question: "Tokoh yang dikenal sebagai Bapak Pendidikan Nasional adalah...",
  options: ["Ki Hajar Dewantara", "Dr. Soetomo", "Soekarno", "Moh. Hatta"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 157,
  category: "Sejarah",
  question: "Kerajaan Hindu tertua di Indonesia adalah...",
  options: ["Majapahit", "Kutai", "Sriwijaya", "Tarumanegara"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 158,
  category: "Sejarah",
  question: "Kerajaan Sriwijaya berpusat di daerah...",
  options: ["Sumatera Selatan", "Jawa Timur", "Kalimantan", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 159,
  category: "Sejarah",
  question: "Pendiri kerajaan Majapahit adalah...",
  options: ["Hayam Wuruk", "Raden Wijaya", "Gajah Mada", "Kertanegara"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 160,
  category: "Sejarah",
  question: "Gajah Mada terkenal dengan ikrarnya yaitu...",
  options: ["Ikrar Kebulatan Tekad", "Sumpah Palapa", "Piagam Jakarta", "Sumpah Pemuda"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 161,
  category: "Sejarah",
  question: "Kerajaan Islam pertama di Indonesia adalah...",
  options: ["Demak", "Samarinda", "Perlak", "Aceh Darussalam"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 162,
  category: "Sejarah",
  question: "Kerajaan Majapahit mencapai puncak kejayaan pada masa...",
  options: ["Kertanegara", "Raden Wijaya", "Hayam Wuruk", "Ken Arok"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 163,
  category: "Sejarah",
  question: "Tokoh yang mengusulkan dasar negara Pancasila adalah...",
  options: ["Soekarno", "Moh. Hatta", "Soepomo", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 164,
  category: "Sejarah",
  question: "Peristiwa G30S/PKI terjadi pada tahun...",
  options: ["1945", "1950", "1965", "1970"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 165,
  category: "Sejarah",
  question: "Tokoh pejuang wanita dari Aceh adalah...",
  options: ["Cut Nyak Dien", "R.A. Kartini", "Martha Christina Tiahahu", "Dewi Sartika"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 166,
  category: "Sejarah",
  question: "Tokoh pejuang wanita yang berasal dari Jepara adalah...",
  options: ["Cut Nyak Dien", "R.A. Kartini", "Dewi Sartika", "Fatmawati"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 167,
  category: "Sejarah",
  question: "Perang Diponegoro terjadi pada tahun...",
  options: ["1825–1830", "1800–1810", "1850–1855", "1900–1905"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 168,
  category: "Sejarah",
  question: "Tokoh utama dalam Perang Diponegoro adalah...",
  options: ["Pangeran Antasari", "Sultan Hasanuddin", "Pangeran Diponegoro", "Tuanku Imam Bonjol"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 169,
  category: "Sejarah",
  question: "Pahlawan nasional dari Kalimantan Selatan adalah...",
  options: ["Sultan Hasanuddin", "Pangeran Antasari", "Pattimura", "Kapitan Pattimura"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 170,
  category: "Sejarah",
  question: "Perang Pattimura terjadi di daerah...",
  options: ["Maluku", "Sumatera", "Jawa", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 171,
  category: "Sejarah",
  question: "Tanggal 10 November diperingati sebagai hari...",
  options: ["Pahlawan", "Kemerdekaan", "Kebangkitan Nasional", "Koperasi"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 172,
  category: "Sejarah",
  question: "Tokoh proklamator Indonesia adalah...",
  options: ["Soekarno dan Hatta", "Soekarno dan Sjahrir", "Hatta dan Sudirman", "Hatta dan Yamin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 173,
  category: "Sejarah",
  question: "Perang Tondano terjadi di daerah...",
  options: ["Sulawesi Utara", "Sumatera Barat", "Kalimantan Timur", "Bali"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 174,
  category: "Sejarah",
  question: "Organisasi Taman Siswa didirikan oleh...",
  options: ["Ki Hajar Dewantara", "Dr. Soetomo", "HOS Tjokroaminoto", "Kartini"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 175,
  category: "Sejarah",
  question: "Tuanku Imam Bonjol memimpin perang di daerah...",
  options: ["Sumatera Barat", "Aceh", "Jawa Tengah", "Maluku"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 176,
  category: "Sejarah",
  question: "Sultan Hasanuddin dijuluki sebagai...",
  options: ["Pahlawan dari Maluku", "Ayam Jantan dari Timur", "Pahlawan dari Aceh", "Raja Jawa"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 177,
  category: "Sejarah",
  question: "Peristiwa Bandung Lautan Api terjadi pada tahun...",
  options: ["1945", "1946", "1947", "1948"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 178,
  category: "Sejarah",
  question: "Pahlawan nasional dari Maluku adalah...",
  options: ["Pattimura", "Cut Nyak Dien", "Diponegoro", "Sultan Hasanuddin"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 179,
  category: "Sejarah",
  question: "Perang Puputan terjadi di daerah...",
  options: ["Bali", "Aceh", "Jawa", "Sulawesi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 180,
  category: "Sejarah",
  question: "Perjanjian Renville ditandatangani pada tahun...",
  options: ["1946", "1947", "1948", "1949"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 181,
  category: "Sejarah",
  question: "Tujuan utama dari perjanjian Linggarjati adalah...",
  options: ["Mengakhiri penjajahan", "Mengatur wilayah kekuasaan", "Mengatur hubungan dagang", "Menjalin kerja sama ekonomi"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 182,
  category: "Sejarah",
  question: "Tokoh pahlawan nasional dari Sulawesi Selatan adalah...",
  options: ["Pangeran Antasari", "Sultan Hasanuddin", "Pattimura", "Cut Nyak Dien"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 183,
  category: "Sejarah",
  question: "Organisasi Sarekat Islam berdiri pada tahun...",
  options: ["1910", "1911", "1912", "1913"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 184,
  category: "Sejarah",
  question: "Pemimpin pertama Sarekat Islam adalah...",
  options: ["HOS Tjokroaminoto", "Soekarno", "Ki Hajar Dewantara", "Dr. Soetomo"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 185,
  category: "Sejarah",
  question: "Perjanjian Bongaya terjadi antara Belanda dan...",
  options: ["Kerajaan Ternate", "Kerajaan Gowa", "Kerajaan Majapahit", "Kerajaan Sriwijaya"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 186,
  category: "Sejarah",
  question: "Organisasi PNI didirikan oleh...",
  options: ["Soekarno", "Moh. Hatta", "Soepomo", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 187,
  category: "Sejarah",
  question: "Perjanjian Roem-Royen dilakukan pada tahun...",
  options: ["1948", "1949", "1950", "1951"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 188,
  category: "Sejarah",
  question: "Negara Indonesia resmi menjadi anggota PBB pada tahun...",
  options: ["1949", "1950", "1955", "1960"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 189,
  category: "Sejarah",
  question: "Konferensi Asia-Afrika diadakan di kota...",
  options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 190,
  category: "Sejarah",
  question: "Tujuan utama Konferensi Asia-Afrika adalah...",
  options: ["Mendirikan PBB", "Menolak kolonialisme", "Membangun ekonomi Asia", "Menentang perang dunia"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 191,
  category: "Sejarah",
  question: "Pahlawan nasional dari Minahasa adalah...",
  options: ["Pattimura", "Sam Ratulangi", "Sudirman", "Antasari"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 192,
  category: "Sejarah",
  question: "Dr. Cipto Mangunkusumo dikenal sebagai tokoh dari organisasi...",
  options: ["Budi Utomo", "Indische Partij", "Taman Siswa", "PNI"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 193,
  category: "Sejarah",
  question: "Indische Partij didirikan oleh Douwes Dekker, Cipto Mangunkusumo, dan...",
  options: ["Ki Hajar Dewantara", "Soekarno", "Moh. Hatta", "Yamin"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 194,
  category: "Sejarah",
  question: "Kongres Pemuda II dilaksanakan di kota...",
  options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 195,
  category: "Sejarah",
  question: "Pahlawan nasional yang dijuluki 'Bung Tomo' berasal dari kota...",
  options: ["Surabaya", "Jakarta", "Semarang", "Medan"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 196,
  category: "Sejarah",
  question: "Isi utama Sumpah Pemuda adalah...",
  options: ["Satu nusa, satu bangsa, satu bahasa", "Satu tanah air", "Merdeka atau mati", "Cinta tanah air"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 197,
  category: "Sejarah",
  question: "Peristiwa Rengasdengklok terjadi sebelum...",
  options: ["Proklamasi", "Kongres Pemuda", "Konferensi Meja Bundar", "Sumpah Pemuda"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 198,
  category: "Sejarah",
  question: "Konferensi Meja Bundar (KMB) diadakan pada tahun...",
  options: ["1948", "1949", "1950", "1951"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 199,
  category: "Sejarah",
  question: "Tokoh utama dalam Perang Padri adalah...",
  options: ["Pangeran Diponegoro", "Tuanku Imam Bonjol", "Sultan Hasanuddin", "Pattimura"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 200,
  category: "Sejarah",
  question: "Rumusan dasar negara pertama kali muncul dalam sidang...",
  options: ["BPUPKI", "PPKI", "KNIP", "DPR"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},

  // ---------------- BAHASA INDONESIA ----------------
  {
    id: 201,
    category: "Bahasa Indonesia",
    question: "Gagasan utama dari sebuah paragraf disebut...",
    options: ["Ide pokok", "Kalimat utama", "Kesimpulan", "Judul"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 202,
    category: "Bahasa Indonesia",
    question: "Kalimat yang berisi ajakan biasanya menggunakan kata...",
    options: ["Sebaiknya", "Harus", "Mari", "Akan"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 203,
    category: "Bahasa Indonesia",
    question: "Kalimat efektif harus memiliki...",
    options: ["Banyak kata", "Subjek dan predikat", "Kata sulit", "Kalimat majemuk"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 204,
    category: "Bahasa Indonesia",
    question: "Sinonim dari kata 'indah' adalah...",
    options: ["Cantik", "Buruk", "Hitam", "Kotor"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 205,
    category: "Bahasa Indonesia",
    question: "Antonim dari kata 'tinggi' adalah...",
    options: ["Panjang", "Rendah", "Kecil", "Pendek"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 206,
    category: "Bahasa Indonesia",
    question: "Kata baku dari 'aktifitas' adalah...",
    options: ["Aktivitas", "Aktifitas", "Aktivas", "Akitvitas"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 207,
    category: "Bahasa Indonesia",
    question: "Kalimat yang benar penulisannya adalah...",
    options: ["Dia pergi ke pasar, untuk membeli sayur.", "Dia pergi ke pasar untuk membeli sayur.", "Dia pergi ke pasar. untuk membeli sayur", "Dia pergi ke pasar untuk membeli sayur,"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 208,
    category: "Bahasa Indonesia",
    question: "Kalimat yang mengandung makna perintah adalah...",
    options: ["Kamu sudah makan?", "Tolong ambilkan buku itu!", "Dia sedang membaca buku.", "Mereka bermain di taman."],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 209,
    category: "Bahasa Indonesia",
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
    category: "Bahasa Indonesia",
    question: "Teks yang berisi langkah-langkah melakukan sesuatu disebut teks...",
    options: ["Prosedur", "Deskripsi", "Narasi", "Eksposisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 211,
    category: "Bahasa Indonesia",
    question: "Tujuan dari teks deskripsi adalah...",
    options: ["Menjelaskan proses", "Mendeskripsikan objek secara detail", "Memberi pendapat", "Membujuk pembaca"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 212,
    category: "Bahasa Indonesia",
    question: "Teks narasi biasanya menceritakan tentang...",
    options: ["Langkah kerja", "Suatu peristiwa", "Pendapat seseorang", "Penjelasan ilmiah"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 213,
    category: "Bahasa Indonesia",
    question: "Contoh kata serapan dari bahasa Inggris adalah...",
    options: ["Televisi", "Rumah", "Sawah", "Padi"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 214,
    category: "Bahasa Indonesia",
    question: "Kata 'mempercantik' memiliki imbuhan...",
    options: ["me- dan -kan", "di- dan -kan", "pe- dan -an", "ber- dan -an"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 215,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang termasuk kalimat pasif adalah...",
    options: ["Ibu memasak nasi.", "Nasi dimasak oleh ibu.", "Ayah membeli koran.", "Mereka sedang makan."],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 216,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Andi membaca buku di perpustakaan' memiliki pola kalimat...",
    options: ["S-P-O", "S-P-K", "S-P-O-K", "S-P"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 217,
    category: "Bahasa Indonesia",
    question: "Kata 'pengetahuan' terbentuk dari bentuk dasar...",
    options: ["Tahu", "Mengetahui", "Pengetahui", "Ketahuan"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 218,
    category: "Bahasa Indonesia",
    question: "Tanda baca yang digunakan untuk mengakhiri kalimat tanya adalah...",
    options: ["Titik", "Koma", "Tanda tanya", "Tanda seru"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 219,
    category: "Bahasa Indonesia",
    question: "Kata 'menyapu' berarti...",
    options: ["Kegiatan memasak", "Membersihkan lantai", "Mencuci piring", "Menulis di papan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 220,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Budi pergi ke sekolah setiap pagi.' termasuk jenis kalimat...",
    options: ["Perintah", "Berita", "Tanya", "Seru"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 221,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang termasuk kalimat seru adalah...",
    options: ["Wah, indah sekali pemandangan itu!", "Kamu sudah makan?", "Dia sedang tidur.", "Mereka bermain bola."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 222,
    category: "Bahasa Indonesia",
    question: "Kata 'berlari' memiliki imbuhan...",
    options: ["me-", "ber-", "di-", "ter-"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 223,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Pohon itu tumbuh tinggi' memiliki predikat...",
    options: ["Pohon", "Itu", "Tumbuh", "Tinggi"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 224,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang mengandung makna larangan adalah...",
    options: ["Jangan buang sampah sembarangan!", "Ayo kita makan!", "Kamu belajar ya.", "Budi sedang tidur."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 225,
    category: "Bahasa Indonesia",
    question: "Paragraf yang berisi ajakan disebut paragraf...",
    options: ["Persuasi", "Deskripsi", "Narasi", "Eksposisi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 226,
    category: "Bahasa Indonesia",
    question: "Kata 'pemanasan' berasal dari kata dasar...",
    options: ["Panas", "Memanas", "Pemanas", "Dipanas"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 227,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Air sungai itu sangat jernih.' termasuk kalimat...",
    options: ["Berita", "Tanya", "Perintah", "Seru"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 228,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Ia memukul bola dengan keras' memiliki objek...",
    options: ["Ia", "Memukul", "Bola", "Keras"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 229,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Adik menangis karena jatuh' termasuk kalimat...",
    options: ["Majemuk", "Tunggal", "Pasif", "Tak langsung"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 230,
    category: "Bahasa Indonesia",
    question: "Kata yang memiliki makna kebalikan disebut...",
    options: ["Antonim", "Sinonim", "Homofon", "Homonim"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 231,
    category: "Bahasa Indonesia",
    question: "Kata 'rajin' bersinonim dengan...",
    options: ["Malas", "Ulet", "Lambat", "Santai"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 232,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Buku itu dibaca oleh Dina.' termasuk kalimat...",
    options: ["Aktif", "Pasif", "Majemuk", "Langsung"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 233,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang menggunakan kata depan dengan benar adalah...",
    options: ["Dia pergi ke pasar.", "Dia pergi di pasar.", "Dia pergi dari pasar.", "Dia pergi untuk pasar."],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 234,
    category: "Bahasa Indonesia",
    question: "Kata 'menggambar' termasuk kata kerja karena...",
    options: ["Menunjukkan benda", "Menunjukkan sifat", "Menunjukkan tindakan", "Menunjukkan tempat"],
    correctAnswer: 2,
    difficulty: "easy",
    points: 5
  },
  {
    id: 235,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Siti membaca buku di taman setiap sore.' memiliki keterangan...",
    options: ["Siti", "Buku", "Di taman setiap sore", "Membaca"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },
  {
    id: 236,
    category: "Bahasa Indonesia",
    question: "Kata 'penjual' memiliki imbuhan...",
    options: ["pe- dan -an", "pe- dan -ul", "pe- dan -l", "pe- dan -kan"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 237,
    category: "Bahasa Indonesia",
    question: "Paragraf yang menceritakan pengalaman seseorang disebut teks...",
    options: ["Narasi", "Eksposisi", "Persuasi", "Deskripsi"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 238,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang menggunakan ejaan tidak baku adalah...",
    options: ["Kami bersekolah setiap hari.", "Ayah bekerja dikantor.", "Ibu memasak di dapur.", "Mereka belajar bersama."],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 239,
    category: "Bahasa Indonesia",
    question: "Kata 'mengajar' termasuk kata...",
    options: ["Benda", "Kerja", "Sifat", "Keterangan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 240,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Dia tidak hadir karena sakit.' termasuk kalimat...",
    options: ["Tunggal", "Majemuk sebab-akibat", "Majemuk setara", "Pasif"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 241,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Pekerjaan itu telah selesai.' mengandung kata...",
    options: ["Kata kerja", "Kata benda", "Kata sifat", "Kata bilangan"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 242,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Saya membeli buah, sayur, dan roti di pasar.' menggunakan tanda baca...",
    options: ["Titik", "Koma", "Tanda seru", "Tanda petik"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 243,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Anak itu berlari dengan cepat' termasuk kalimat...",
    options: ["Aktif", "Pasif", "Majemuk", "Tak langsung"],
    correctAnswer: 0,
    difficulty: "easy",
    points: 5
  },
  {
    id: 244,
    category: "Bahasa Indonesia",
    question: "Kata 'kebersihan' merupakan kata bentukan dari kata dasar...",
    options: ["Bersih", "Membersihkan", "Pembersih", "Berbersih"],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 245,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang menggunakan imbuhan dengan benar adalah...",
    options: ["Dia menulis surat.", "Dia tulis surat.", "Dia ditulis surat.", "Dia menuliskan surat oleh dia."],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 246,
    category: "Bahasa Indonesia",
    question: "Teks iklan biasanya bertujuan untuk...",
    options: ["Memberi informasi", "Membujuk pembaca", "Menjelaskan proses", "Menguraikan sebab-akibat"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 247,
    category: "Bahasa Indonesia",
    question: "Teks laporan hasil observasi berisi...",
    options: ["Pendapat pribadi", "Hasil pengamatan", "Cerita fiksi", "Ajakan"],
    correctAnswer: 1,
    difficulty: "medium",
    points: 10
  },
  {
    id: 248,
    category: "Bahasa Indonesia",
    question: "Kata 'bermain' termasuk ke dalam jenis kata...",
    options: ["Benda", "Kerja", "Sifat", "Keterangan"],
    correctAnswer: 1,
    difficulty: "easy",
    points: 5
  },
  {
    id: 249,
    category: "Bahasa Indonesia",
    question: "Kalimat berikut yang menggunakan kata baku adalah...",
    options: ["Saya menonton film di bioskop.", "Saya nonton film di bioskop.", "Saya nontonin film di bioskop.", "Saya liat film di bioskop."],
    correctAnswer: 0,
    difficulty: "medium",
    points: 10
  },
  {
    id: 250,
    category: "Bahasa Indonesia",
    question: "Kalimat 'Pohon itu tumbuh di halaman rumah.' termasuk kalimat dengan pola...",
    options: ["S-P", "S-P-O", "S-P-K", "S-P-O-K"],
    correctAnswer: 2,
    difficulty: "medium",
    points: 10
  },

  // ---------------- BAHASA INGGRIS ----------------
  {
  id: 251,
  category: "Bahasa Inggris",
  question: "Choose the correct form: She ____ to school every morning.",
  options: ["go", "goes", "going", "gone"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 252,
  category: "Bahasa Inggris",
  question: "The opposite of 'expensive' is ____.",
  options: ["cheap", "costly", "valuable", "rich"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 253,
  category: "Bahasa Inggris",
  question: "I ____ my homework last night.",
  options: ["do", "does", "did", "doing"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 254,
  category: "Bahasa Inggris",
  question: "What is the plural form of 'child'?",
  options: ["childs", "childes", "children", "childrens"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 255,
  category: "Bahasa Inggris",
  question: "She is taller ____ her sister.",
  options: ["then", "than", "that", "to"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 256,
  category: "Bahasa Inggris",
  question: "We ____ TV when the power went off.",
  options: ["watch", "watched", "were watching", "have watched"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 257,
  category: "Bahasa Inggris",
  question: "They have lived here ____ 2010.",
  options: ["for", "since", "in", "at"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 258,
  category: "Bahasa Inggris",
  question: "The past tense of 'run' is ____.",
  options: ["runned", "ran", "run", "running"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 259,
  category: "Bahasa Inggris",
  question: "Complete the sentence: 'If it rains, we ____ stay at home.'",
  options: ["will", "would", "was", "is"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 260,
  category: "Bahasa Inggris",
  question: "What time ____ you go to bed?",
  options: ["do", "does", "did", "doing"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 261,
  category: "Bahasa Inggris",
  question: "Find the synonym of 'happy'.",
  options: ["sad", "joyful", "angry", "upset"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 262,
  category: "Bahasa Inggris",
  question: "She is interested ____ art.",
  options: ["on", "in", "at", "to"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 263,
  category: "Bahasa Inggris",
  question: "Choose the correct spelling:",
  options: ["recieve", "receive", "receeve", "receve"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 264,
  category: "Bahasa Inggris",
  question: "I haven’t seen him ____ Monday.",
  options: ["since", "for", "during", "at"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 265,
  category: "Bahasa Inggris",
  question: "Which one is a noun?",
  options: ["quickly", "happy", "book", "run"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 266,
  category: "Bahasa Inggris",
  question: "‘She can’t come because she is sick.’ — The word 'because' shows a ____ relationship.",
  options: ["contrast", "reason", "time", "result"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 267,
  category: "Bahasa Inggris",
  question: "Choose the correct sentence:",
  options: ["He don’t like tea.", "He doesn’t like tea.", "He didn’t likes tea.", "He not like tea."],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 268,
  category: "Bahasa Inggris",
  question: "The superlative form of 'good' is ____.",
  options: ["better", "best", "goodest", "most good"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 269,
  category: "Bahasa Inggris",
  question: "He usually ____ his homework in the evening.",
  options: ["do", "does", "did", "done"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 270,
  category: "Bahasa Inggris",
  question: "Find the antonym of 'big'.",
  options: ["small", "large", "huge", "giant"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 271,
  category: "Bahasa Inggris",
  question: "My father ____ to work by car every day.",
  options: ["go", "goes", "going", "gone"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 272,
  category: "Bahasa Inggris",
  question: "The past tense of 'eat' is ____.",
  options: ["eated", "eats", "ate", "eating"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 273,
  category: "Bahasa Inggris",
  question: "‘He runs faster than me.’ — The word 'faster' is a ____ adjective.",
  options: ["positive", "comparative", "superlative", "possessive"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 274,
  category: "Bahasa Inggris",
  question: "We ____ a movie when the phone rang.",
  options: ["watch", "watched", "were watching", "watching"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 275,
  category: "Bahasa Inggris",
  question: "Choose the correct sentence:",
  options: ["She can sings.", "She can sing.", "She cans sing.", "She can to sing."],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 276,
  category: "Bahasa Inggris",
  question: "‘There are many ____ in the garden.’",
  options: ["flower", "flowers", "flor", "flours"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 277,
  category: "Bahasa Inggris",
  question: "Complete: ‘The book is ____ the table.’",
  options: ["in", "on", "at", "under"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 278,
  category: "Bahasa Inggris",
  question: "‘Let’s go to the library.’ The word ‘Let’s’ means ____.",
  options: ["Let us", "Let he", "Let me", "Let they"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 279,
  category: "Bahasa Inggris",
  question: "Which word has a different vowel sound?",
  options: ["cat", "hat", "car", "bat"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 280,
  category: "Bahasa Inggris",
  question: "The correct question is: ____ you like pizza?",
  options: ["Do", "Does", "Is", "Are"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 281,
  category: "Bahasa Inggris",
  question: "‘He didn’t come yesterday.’ The word ‘didn’t’ means ____.",
  options: ["did not", "do not", "does not", "was not"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 282,
  category: "Bahasa Inggris",
  question: "What is the past participle of 'write'?",
  options: ["writed", "wrote", "written", "writing"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 283,
  category: "Bahasa Inggris",
  question: "‘I have already eaten.’ — The tense used is ____.",
  options: ["simple past", "present perfect", "past continuous", "future simple"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 284,
  category: "Bahasa Inggris",
  question: "‘Don’t make noise!’ means ____.",
  options: ["Be quiet", "Talk loudly", "Sing", "Play music"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 285,
  category: "Bahasa Inggris",
  question: "Choose the correct pronoun: ‘This is ____ book.’",
  options: ["me", "mine", "my", "I"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 286,
  category: "Bahasa Inggris",
  question: "‘He is a doctor.’ — The article ‘a’ is used because ____.",
  options: ["it’s plural", "it starts with vowel sound", "it’s singular and begins with consonant sound", "it’s possessive"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 287,
  category: "Bahasa Inggris",
  question: "‘My mother is cooking.’ The tense used is ____.",
  options: ["simple present", "present continuous", "past tense", "future tense"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 288,
  category: "Bahasa Inggris",
  question: "The synonym of ‘begin’ is ____.",
  options: ["start", "end", "finish", "stop"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 289,
  category: "Bahasa Inggris",
  question: "‘The weather is very hot today.’ — The opposite of ‘hot’ is ____.",
  options: ["warm", "cool", "cold", "freezing"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 290,
  category: "Bahasa Inggris",
  question: "Choose the correct sentence:",
  options: ["She don’t plays guitar.", "She doesn’t play guitar.", "She not play guitar.", "She isn’t play guitar."],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 291,
  category: "Bahasa Inggris",
  question: "‘We have lived here for ten years.’ The word ‘for’ shows ____.",
  options: ["reason", "duration", "place", "purpose"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 292,
  category: "Bahasa Inggris",
  question: "‘Can you help me?’ — The sentence is a ____.",
  options: ["statement", "question", "command", "exclamation"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 293,
  category: "Bahasa Inggris",
  question: "‘Please close the door.’ — The word ‘please’ makes the sentence more ____.",
  options: ["rude", "polite", "angry", "strong"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 294,
  category: "Bahasa Inggris",
  question: "‘Where ____ you born?’",
  options: ["is", "was", "were", "are"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 295,
  category: "Bahasa Inggris",
  question: "‘Don’t forget to bring your umbrella.’ — The function of this sentence is to ____.",
  options: ["invite", "advise", "warn", "promise"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 296,
  category: "Bahasa Inggris",
  question: "Choose the correct response: ‘How are you?’",
  options: ["I’m fine, thank you.", "Yes, I am.", "I’m go.", "You are fine."],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 297,
  category: "Bahasa Inggris",
  question: "‘It’s raining. You should take an umbrella.’ — The word ‘should’ expresses ____.",
  options: ["necessity", "advice", "ability", "permission"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 298,
  category: "Bahasa Inggris",
  question: "‘She speaks English very well.’ — The word ‘well’ is a ____.",
  options: ["noun", "adjective", "adverb", "verb"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 299,
  category: "Bahasa Inggris",
  question: "‘Let’s go home.’ — The contraction ‘Let’s’ stands for ____.",
  options: ["Let is", "Let us", "Lets", "Let has"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 300,
  category: "Bahasa Inggris",
  question: "‘She will call you tomorrow.’ — The word ‘will’ shows ____ tense.",
  options: ["past", "present", "future", "perfect"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},

// atronomi 

{
  id: 301,
  category: "Astronomi",
  question: "Planet terbesar di tata surya adalah...",
  options: ["Bumi", "Jupiter", "Saturnus", "Neptunus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 302,
  category: "Astronomi",
  question: "Planet terdekat dengan Matahari adalah...",
  options: ["Venus", "Merkurius", "Bumi", "Mars"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 303,
  category: "Astronomi",
  question: "Urutan planet dari Matahari dimulai dari...",
  options: ["Bumi", "Merkurius", "Mars", "Venus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 304,
  category: "Astronomi",
  question: "Planet yang dikenal sebagai 'planet merah' adalah...",
  options: ["Venus", "Mars", "Saturnus", "Uranus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 305,
  category: "Astronomi",
  question: "Saturnus terkenal karena memiliki...",
  options: ["Lautan luas", "Cincin", "Bulan terbesar", "Warna merah"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 306,
  category: "Astronomi",
  question: "Bintang terdekat dari Bumi adalah...",
  options: ["Proxima Centauri", "Sirius", "Matahari", "Betelgeuse"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 307,
  category: "Astronomi",
  question: "Bulan mengelilingi...",
  options: ["Matahari", "Bumi", "Mars", "Venus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 308,
  category: "Astronomi",
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
  category: "Astronomi",
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
  category: "Astronomi",
  question: "Planet yang memiliki cincin paling mencolok adalah...",
  options: ["Neptunus", "Saturnus", "Uranus", "Jupiter"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 311,
  category: "Astronomi",
  question: "Nama galaksi tempat Bumi berada adalah...",
  options: ["Andromeda", "Bimasakti", "Sombrero", "Whirlpool"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 312,
  category: "Astronomi",
  question: "Planet yang memiliki banyak badai besar adalah...",
  options: ["Mars", "Jupiter", "Venus", "Saturnus"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 313,
  category: "Astronomi",
  question: "Bulan mengelilingi Bumi dalam waktu sekitar...",
  options: ["7 hari", "14 hari", "27 hari", "30 hari"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 314,
  category: "Astronomi",
  question: "Planet yang memiliki suhu terpanas di tata surya adalah...",
  options: ["Merkurius", "Venus", "Mars", "Jupiter"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 315,
  category: "Astronomi",
  question: "Bintang yang meledak disebut...",
  options: ["Nebula", "Supernova", "Meteorit", "Komet"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 316,
  category: "Astronomi",
  question: "Tata surya terbentuk sekitar ... tahun yang lalu.",
  options: ["1 juta", "4,6 miliar", "10 juta", "1 miliar"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 317,
  category: "Astronomi",
  question: "Planet yang dikenal memiliki rotasi paling cepat adalah...",
  options: ["Jupiter", "Saturnus", "Mars", "Bumi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 318,
  category: "Astronomi",
  question: "Benda langit yang memantulkan cahaya Matahari adalah...",
  options: ["Bintang", "Bulan", "Nebula", "Matahari"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 319,
  category: "Astronomi",
  question: "Komet tersusun dari...",
  options: ["Batu dan logam", "Es dan debu", "Gas dan air", "Besi dan karbon"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 320,
  category: "Astronomi",
  question: "Planet terkecil di tata surya adalah...",
  options: ["Mars", "Merkurius", "Venus", "Neptunus"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 321,
  category: "Astronomi",
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
  category: "Astronomi",
  question: "Planet yang memiliki warna kebiruan karena gas metana adalah...",
  options: ["Saturnus", "Uranus", "Neptunus", "Jupiter"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 323,
  category: "Astronomi",
  question: "Benda langit yang mengorbit planet disebut...",
  options: ["Satelit", "Asteroid", "Komet", "Bintang"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 324,
  category: "Astronomi",
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
  category: "Astronomi",
  question: "Jumlah planet di tata surya setelah Pluto tidak dianggap planet adalah...",
  options: ["8", "9", "7", "10"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 326,
  category: "Astronomi",
  question: "Nama lain dari Bima Sakti dalam bahasa Inggris adalah...",
  options: ["Milky Way", "Galaxy Star", "Space Line", "Solar Path"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 327,
  category: "Astronomi",
  question: "Planet yang dikenal memiliki banyak bulan adalah...",
  options: ["Mars", "Jupiter", "Venus", "Merkurius"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 328,
  category: "Astronomi",
  question: "Bintang yang sangat besar dan panas biasanya berwarna...",
  options: ["Merah", "Kuning", "Putih kebiruan", "Oranye"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 329,
  category: "Astronomi",
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
  category: "Astronomi",
  question: "Planet yang paling jauh dari Matahari adalah...",
  options: ["Neptunus", "Uranus", "Pluto", "Saturnus"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 331,
  category: "Astronomi",
  question: "Galaksi Andromeda berada paling dekat dengan...",
  options: ["Galaksi Triangulum", "Galaksi Bimasakti", "Galaksi Sombrero", "Galaksi M87"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 332,
  category: "Astronomi",
  question: "Bintang jatuh sebenarnya adalah...",
  options: ["Bintang yang meledak", "Meteoroid yang terbakar di atmosfer", "Komet kecil", "Satelit alami"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 333,
  category: "Astronomi",
  question: "Lapisan atmosfer yang paling dekat dengan permukaan Bumi disebut...",
  options: ["Stratosfer", "Troposfer", "Mesosfer", "Termosfer"],
  correctAnswer: 1,
  difficulty: "easy",
  points: 5
},
{
  id: 334,
  category: "Astronomi",
  question: "Matahari menghasilkan energi melalui proses...",
  options: ["Fusi nuklir", "Fisi nuklir", "Pembakaran kimia", "Reaksi gravitasi"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 335,
  category: "Astronomi",
  question: "Planet yang disebut 'raksasa es' adalah...",
  options: ["Uranus dan Neptunus", "Mars dan Bumi", "Jupiter dan Saturnus", "Venus dan Merkurius"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 336,
  category: "Astronomi",
  question: "Periode revolusi Bumi mengelilingi Matahari adalah sekitar...",
  options: ["24 jam", "30 hari", "365 hari", "12 jam"],
  correctAnswer: 2,
  difficulty: "easy",
  points: 5
},
{
  id: 337,
  category: "Astronomi",
  question: "Bintang lahir dari awan gas dan debu yang disebut...",
  options: ["Meteor", "Nebula", "Komet", "Satelit"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 338,
  category: "Astronomi",
  question: "Rotasi Bumi menyebabkan terjadinya...",
  options: ["Siang dan malam", "Musim", "Gerhana", "Hujan meteor"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 339,
  category: "Astronomi",
  question: "Revolusi Bumi menyebabkan terjadinya...",
  options: ["Gerhana", "Siang malam", "Perubahan musim", "Angin"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 340,
  category: "Astronomi",
  question: "Planet yang tidak memiliki satelit alami adalah...",
  options: ["Merkurius dan Venus", "Mars dan Bumi", "Saturnus dan Jupiter", "Uranus dan Neptunus"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 341,
  category: "Astronomi",
  question: "Asteroid umumnya berada di antara orbit planet...",
  options: ["Bumi dan Mars", "Mars dan Jupiter", "Saturnus dan Uranus", "Venus dan Merkurius"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 342,
  category: "Astronomi",
  question: "Gerakan semu tahunan Matahari disebabkan oleh...",
  options: ["Rotasi Bumi", "Revolusi Bumi", "Gerak Bulan", "Gerak planet"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 343,
  category: "Astronomi",
  question: "Bulan purnama terjadi ketika posisi Bulan berada...",
  options: ["Sejajar dengan Matahari", "Berada di belakang Bumi", "Di antara Bumi dan Matahari", "Tepat di atas kutub Bumi"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 344,
  category: "Astronomi",
  question: "Fenomena aurora sering terjadi di daerah...",
  options: ["Khatulistiwa", "Kutub", "Pegunungan", "Laut"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
},
{
  id: 345,
  category: "Astronomi",
  question: "Benda langit yang disebut ‘planet kerdil’ adalah...",
  options: ["Pluto", "Merkurius", "Neptunus", "Ceres"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 346,
  category: "Astronomi",
  question: "Nama satelit alami terbesar milik Jupiter adalah...",
  options: ["Europa", "Io", "Ganymede", "Callisto"],
  correctAnswer: 2,
  difficulty: "medium",
  points: 10
},
{
  id: 347,
  category: "Astronomi",
  question: "Alat untuk mengamati benda langit disebut...",
  options: ["Teleskop", "Mikroskop", "Periskop", "Barometer"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 348,
  category: "Astronomi",
  question: "Jumlah bulan yang dimiliki Bumi adalah...",
  options: ["1", "2", "3", "4"],
  correctAnswer: 0,
  difficulty: "easy",
  points: 5
},
{
  id: 349,
  category: "Astronomi",
  question: "Planet yang memiliki arah rotasi berlawanan dengan planet lain adalah...",
  options: ["Venus", "Bumi", "Mars", "Saturnus"],
  correctAnswer: 0,
  difficulty: "medium",
  points: 10
},
{
  id: 350,
  category: "Astronomi",
  question: "Tata surya merupakan bagian kecil dari...",
  options: ["Bulan", "Galaksi", "Nebula", "Asteroid"],
  correctAnswer: 1,
  difficulty: "medium",
  points: 10
}
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const limit = searchParams.get('limit')
    
    let filteredQuestions = [...allQuestions]
    
    if (category && category !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.category === category)
    }
    
    if (difficulty && difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === difficulty)
    }
    
    // Shuffle questions for variety
    filteredQuestions.sort(() => Math.random() - 0.5)
    
    // Apply limit if specified
    if (limit) {
      filteredQuestions = filteredQuestions.slice(0, parseInt(limit))
    }
    
    return NextResponse.json({
      success: true,
      data: filteredQuestions
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}