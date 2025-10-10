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
  {
    id: 1,
    category: 'matematika',
    question: 'Berapakah hasil dari 12 × 8?',
    options: ['90', '96', '100', '88'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 2,
    category: 'matematika',
    question: 'Jika x + 5 = 12, maka x = ?',
    options: ['5', '7', '12', '17'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 3,
    category: 'matematika',
    question: 'Hasil dari 25 ÷ 5 + 6 adalah …',
    options: ['11', '15', '12', '10'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 4,
    category: 'matematika',
    question: 'Berapakah luas persegi dengan sisi 7 cm?',
    options: ['42', '49', '14', '28'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 5,
    category: 'matematika',
    question: 'Jika 3x = 21, maka x = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 6,
    category: 'matematika',
    question: 'Hasil dari 15% dari 200 adalah …',
    options: ['25', '30', '35', '40'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 7,
    category: 'matematika',
    question: 'Berapakah volume kubus dengan sisi 4 cm?',
    options: ['16', '64', '12', '8'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 8,
    category: 'matematika',
    question: 'Jika sebuah segitiga memiliki alas 10 cm dan tinggi 8 cm, berapakah luasnya?',
    options: ['40', '80', '50', '60'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 9,
    category: 'matematika',
    question: 'Berapakah hasil dari 3² + 4²?',
    options: ['25', '24', '12', '7'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 10,
    category: 'matematika',
    question: 'Jika sebuah bilangan dikurangi 7 hasilnya 15, bilangan itu adalah …',
    options: ['8', '22', '21', '12'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },

  // ---------------- FISIKA ----------------
  {
    id: 11,
    category: 'fisika',
    question: 'Satuan kecepatan dalam SI adalah …',
    options: ['m/s', 'kg', 'N', 'J'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 12,
    category: 'fisika',
    question: 'Hukum Newton yang pertama dikenal sebagai …',
    options: ['Hukum Aksi-Reaksi', 'Hukum Inersia', 'Hukum Gravitasi', 'Hukum Momentum'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 13,
    category: 'fisika',
    question: 'Benda jatuh bebas dipengaruhi oleh …',
    options: ['Gaya gesek', 'Gaya magnet', 'Gaya gravitasi', 'Gaya listrik'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 14,
    category: 'fisika',
    question: 'Satuan massa dalam SI adalah …',
    options: ['kg', 'g', 'N', 'm'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 15,
    category: 'fisika',
    question: 'Energi kinetik suatu benda dihitung dengan rumus …',
    options: ['m×v', '½ mv²', 'm×g×h', 'm×a'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 16,
    category: 'fisika',
    question: 'Sebuah benda bermassa 2 kg bergerak dengan kecepatan 3 m/s. Energi kinetiknya adalah …',
    options: ['3 J', '9 J', '6 J', '2 J'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 17,
    category: 'fisika',
    question: 'Benda yang berada dalam keadaan diam cenderung tetap diam sesuai hukum …',
    options: ['Hukum Newton I', 'Hukum Newton II', 'Hukum Newton III', 'Hukum Gravitasi'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 18,
    category: 'fisika',
    question: 'Gaya yang bekerja pada benda = massa × percepatan. Ini adalah hukum …',
    options: ['Newton I', 'Newton II', 'Newton III', 'Gravitasi'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 19,
    category: 'fisika',
    question: 'Satuan gaya dalam SI adalah …',
    options: ['N', 'kg', 'J', 'Pa'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 20,
    category: 'fisika',
    question: 'Apa alat yang digunakan untuk mengukur massa suatu benda?',
    options: ['Mikrometer', 'Timbangan', 'Amperemeter', 'Barometer'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },

  // ---------------- KIMIA ----------------
  {
    id: 21,
    category: 'kimia',
    question: 'Simbol kimia untuk air adalah …',
    options: ['H2O', 'O2', 'CO2', 'NaCl'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 22,
    category: 'kimia',
    question: 'Hidrogen adalah gas yang …',
    options: ['Berwarna', 'Tidak berwarna', 'Berbau tajam', 'Berasa pahit'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 23,
    category: 'kimia',
    question: 'Asam klorida memiliki rumus kimia …',
    options: ['HCl', 'NaCl', 'H2SO4', 'NaOH'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 24,
    category: 'kimia',
    question: 'pH netral suatu larutan adalah …',
    options: ['7', '0', '14', '1'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 25,
    category: 'kimia',
    question: 'Senyawa garam dapur adalah …',
    options: ['NaCl', 'H2O', 'CO2', 'O2'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 26,
    category: 'kimia',
    question: 'Senyawa organik selalu mengandung unsur …',
    options: ['Karbon', 'Oksigen', 'Nitrogen', 'Hidrogen'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 27,
    category: 'kimia',
    question: 'Gas yang digunakan untuk mengisi balon udara adalah …',
    options: ['Oksigen', 'Hidrogen', 'Helium', 'Karbon dioksida'],
    correctAnswer: 2,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 28,
    category: 'kimia',
    question: 'Larutan asam memiliki pH kurang dari …',
    options: ['7', '14', '0', '1'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 29,
    category: 'kimia',
    question: 'Unsur yang paling banyak di bumi adalah …',
    options: ['Oksigen', 'Karbon', 'Hidrogen', 'Nitrogen'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 30,
    category: 'kimia',
    question: 'Apa zat yang menyebabkan besi berkarat?',
    options: ['Air', 'Oksigen', 'Karbon', 'Nitrogen'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },

  // ---------------- SEJARAH ----------------
  {
    id: 31,
    category: 'sejarah',
    question: 'Proklamasi kemerdekaan Indonesia dibacakan pada tanggal …',
    options: ['17 Agustus 1945', '10 November 1945', '1 Juni 1945', '28 Oktober 1928'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 32,
    category: 'sejarah',
    question: 'Pahlawan yang memimpin pertempuran Surabaya 10 November 1945 adalah …',
    options: ['Sukarno', 'Ahmad Yani', 'Soedirman', 'Sutomo'],
    correctAnswer: 3,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 33,
    category: 'sejarah',
    question: 'Sumpah Pemuda terjadi pada tanggal …',
    options: ['28 Oktober 1928', '17 Agustus 1945', '1 Juni 1928', '20 Mei 1908'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 34,
    category: 'sejarah',
    question: 'Kerajaan Majapahit berdiri pada abad ke …',
    options: ['13', '14', '15', '16'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 35,
    category: 'sejarah',
    question: 'Peristiwa G30S terjadi pada tahun …',
    options: ['1965', '1966', '1967', '1968'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 36,
    category: 'sejarah',
    question: 'Proklamator kemerdekaan Indonesia adalah …',
    options: ['Soekarno dan Hatta', 'Sutomo', 'Sudirman', 'Sutan Sjahrir'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 37,
    category: 'sejarah',
    question: 'Perang Diponegoro terjadi pada abad ke …',
    options: ['18', '19', '20', '17'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 38,
    category: 'sejarah',
    question: 'Hari Kebangkitan Nasional diperingati setiap tanggal …',
    options: ['20 Mei', '17 Agustus', '10 November', '28 Oktober'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 39,
    category: 'sejarah',
    question: 'Peristiwa “Sumpah Palu Arit” terjadi di …',
    options: ['Majapahit', 'Belanda', 'Uni Soviet', 'Tidak ada peristiwa ini'],
    correctAnswer: 3,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 40,
    category: 'sejarah',
    question: 'Hari Pahlawan diperingati setiap tanggal …',
    options: ['10 November', '17 Agustus', '20 Mei', '28 Oktober'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },

  // ---------------- BAHASA INDONESIA ----------------
  {
    id: 41,
    category: 'bahasa_indonesia',
    question: 'Sinonim kata "cepat" adalah …',
    options: ['Lambat', 'Lekas', 'Malas', 'Pelan'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 42,
    category: 'bahasa_indonesia',
    question: 'Antonim kata "besar" adalah …',
    options: ['Kecil', 'Panjang', 'Tinggi', 'Lebar'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 43,
    category: 'bahasa_indonesia',
    question: 'Kalimat "Dia pergi ke sekolah" termasuk kalimat …',
    options: ['Tanya', 'Deklaratif', 'Perintah', 'Seru'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 44,
    category: 'bahasa_indonesia',
    question: 'Kata "guru" merupakan kata …',
    options: ['Keterangan', 'Kata benda', 'Kata sifat', 'Kata kerja'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 45,
    category: 'bahasa_indonesia',
    question: 'Makna kata "antusias" adalah …',
    options: ['Bingung', 'Semangat', 'Lelah', 'Sedih'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 46,
    category: 'bahasa_indonesia',
    question: 'Kata yang tepat untuk melengkapi kalimat: "Dia … buku di meja."',
    options: ['meletakkan', 'melempar', 'menangkap', 'membawa'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 47,
    category: 'bahasa_indonesia',
    question: 'Sinonim kata "cerdas" adalah …',
    options: ['Pintar', 'Bodoh', 'Malas', 'Lambat'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 48,
    category: 'bahasa_indonesia',
    question: 'Antonim kata "panjang" adalah …',
    options: ['Tinggi', 'Panjang', 'Pendek', 'Lebar'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 49,
    category: 'bahasa_indonesia',
    question: 'Kalimat "Tolong bantu saya" termasuk kalimat …',
    options: ['Deklaratif', 'Perintah', 'Tanya', 'Seru'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 50,
    category: 'bahasa_indonesia',
    question: 'Kata "indah" termasuk kata …',
    options: ['Kata benda', 'Kata sifat', 'Kata kerja', 'Kata keterangan'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },

  // ---------------- BAHASA INGGRIS ----------------
  {
    id: 51,
    category: 'bahasa_inggris',
    question: 'What is the opposite of "hot"?',
    options: ['Cold', 'Warm', 'Cool', 'Boiling'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 52,
    category: 'bahasa_inggris',
    question: 'What is the plural form of "child"?',
    options: ['Childs', 'Children', 'Childes', 'Child'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 53,
    category: 'bahasa_inggris',
    question: 'Translate: "Saya makan nasi."',
    options: ['I eat rice', 'I eats rice', 'I eating rice', 'I eaten rice'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 54,
    category: 'bahasa_inggris',
    question: 'Synonym of "happy" is …',
    options: ['Sad', 'Angry', 'Joyful', 'Tired'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 55,
    category: 'bahasa_inggris',
    question: 'What is the past tense of "go"?',
    options: ['Goed', 'Went', 'Go', 'Gone'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 56,
    category: 'bahasa_inggris',
    question: 'Translate: "Saya sedang belajar".',
    options: ['I learning', 'I am learning', 'I learned', 'I is learning'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 57,
    category: 'bahasa_inggris',
    question: 'Antonym of "fast" is …',
    options: ['Quick', 'Slow', 'Rapid', 'Speedy'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 58,
    category: 'bahasa_inggris',
    question: 'What is the correct form: "She … to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 15
  },
  {
    id: 59,
    category: 'bahasa_inggris',
    question: 'Translate: "Mereka bermain di taman."',
    options: ['They play in the park', 'They plays in the park', 'They playing in the park', 'They played in the park'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 60,
    category: 'bahasa_inggris',
    question: 'What is the synonym of "big"?',
    options: ['Large', 'Small', 'Tiny', 'Short'],
    correctAnswer: 0,
    difficulty: 'easy',
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