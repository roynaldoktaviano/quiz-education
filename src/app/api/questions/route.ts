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
  // Science Questions
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
    category: 'science',
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 3,
    category: 'science',
    question: 'What is the speed of light in vacuum?',
    options: ['299,792 km/s', '150,000 km/s', '399,792 km/s', '199,792 km/s'],
    correctAnswer: 0,
    difficulty: 'medium',
    points: 20
  },
  
  // Mathematics Questions
  {
    id: 4,
    category: 'math',
    question: 'What is 15 × 8?',
    options: ['120', '100', '140', '160'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 5,
    category: 'math',
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 6,
    category: 'math',
    question: 'What is the value of π (pi) to two decimal places?',
    options: ['3.12', '3.14', '3.16', '3.18'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 20
  },
  
  // History Questions
  {
    id: 7,
    category: 'history',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
    difficulty: 'medium',
    points: 20
  },
  {
    id: 8,
    category: 'history',
    question: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 9,
    category: 'history',
    question: 'Which ancient wonder of the world still stands today?',
    options: ['Colossus of Rhodes', 'Hanging Gardens', 'Great Pyramid of Giza', 'Lighthouse of Alexandria'],
    correctAnswer: 2,
    difficulty: 'medium',
    points: 20
  },
  
  // Programming Questions
  {
    id: 10,
    category: 'programming',
    question: 'Which language is known as the "language of the web"?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correctAnswer: 1,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 11,
    category: 'programming',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 12,
    category: 'programming',
    question: 'Which data structure follows LIFO principle?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 20
  },
  
  // Art Questions
  {
    id: 13,
    category: 'art',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 14,
    category: 'art',
    question: 'Which art movement was Pablo Picasso associated with?',
    options: ['Impressionism', 'Cubism', 'Surrealism', 'Realism'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 20
  },
  {
    id: 15,
    category: 'art',
    question: 'What is the primary color in subtractive color model?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctAnswer: 0,
    difficulty: 'easy',
    points: 10
  },
  
  // Geography Questions
  {
    id: 16,
    category: 'geography',
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctAnswer: 2,
    difficulty: 'easy',
    points: 10
  },
  {
    id: 17,
    category: 'geography',
    question: 'Which is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correctAnswer: 1,
    difficulty: 'medium',
    points: 20
  },
  {
    id: 18,
    category: 'geography',
    question: 'How many continents are there?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
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