
// Interface definition for Book object structure
export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  owner: string;
  genre: string;
}

// Expanded collection of books with diverse genres including religious, educational, and others
export const books: Book[] = [
  // Original Fiction Books
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "/placeholder.svg",
    description: "A philosophical book about following your dreams and discovering your personal legend.",
    owner: "Alex Doe",
    genre: "Fiction",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "/placeholder.svg",
    description: "A fantasy novel about the adventures of Bilbo Baggins in Middle-earth.",
    owner: "David Brown",
    genre: "Fantasy",
  },

  // Non-Fiction and Educational Books
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "/placeholder.svg",
    description: "An exploration of the history of Homo sapiens from the Stone Age to the modern era.",
    owner: "Jane Smith",
    genre: "Non-Fiction",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/placeholder.svg",
    description: "A comprehensive guide to building good habits and breaking bad ones through small changes.",
    owner: "Susan Garcia",
    genre: "Self-Help",
  },
  {
    id: 7,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "/placeholder.svg",
    description: "A groundbreaking exploration of the two systems that drive the way we think and make decisions.",
    owner: "Robert Chen",
    genre: "Psychology",
  },
  {
    id: 8,
    title: "The Feynman Lectures on Physics",
    author: "Richard P. Feynman",
    coverImage: "/placeholder.svg",
    description: "Classic physics textbook covering mechanics, radiation, heat, quantum mechanics, and more.",
    owner: "Dr. Sarah Wilson",
    genre: "Science",
  },
  {
    id: 9,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    coverImage: "/placeholder.svg",
    description: "An accessible introduction to cosmology, black holes, and the nature of time and space.",
    owner: "Michael Torres",
    genre: "Science",
  },
  {
    id: 10,
    title: "The Art of War",
    author: "Sun Tzu",
    coverImage: "/placeholder.svg",
    description: "Ancient Chinese military treatise on strategy, tactics, and philosophy of warfare.",
    owner: "Kevin Liu",
    genre: "Philosophy",
  },

  // Religious Books
  {
    id: 11,
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    coverImage: "/placeholder.svg",
    description: "A Christian guide to discovering God's purpose for your life through 40 days of reflection.",
    owner: "Pastor John Miller",
    genre: "Religious",
  },
  {
    id: 12,
    title: "Mere Christianity",
    author: "C.S. Lewis",
    coverImage: "/placeholder.svg",
    description: "A rational explanation of Christian faith, exploring morality, belief, and salvation.",
    owner: "Margaret Thompson",
    genre: "Religious",
  },
  {
    id: 13,
    title: "The Quran: A New Translation",
    author: "M.A.S. Abdel Haleem",
    coverImage: "/placeholder.svg",
    description: "A modern English translation of the Quran with commentary and explanatory notes.",
    owner: "Ahmed Hassan",
    genre: "Religious",
  },
  {
    id: 14,
    title: "The Bhagavad Gita",
    author: "Paramahansa Yogananda",
    coverImage: "/placeholder.svg",
    description: "Ancient Hindu scripture exploring duty, righteousness, and the path to spiritual realization.",
    owner: "Priya Sharma",
    genre: "Religious",
  },
  {
    id: 15,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    coverImage: "/placeholder.svg",
    description: "A spiritual guide to enlightenment through living in the present moment.",
    owner: "Lisa Rodriguez",
    genre: "Spirituality",
  },

  // Classic Literature
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "/placeholder.svg",
    description: "A classic novel dealing with racial injustice in the American South through a child's eyes.",
    owner: "Peter Jones",
    genre: "Classic",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    coverImage: "/placeholder.svg",
    description: "A dystopian novel set in a totalitarian society exploring surveillance and control.",
    owner: "Mary Williams",
    genre: "Dystopian",
  },
  {
    id: 16,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "/placeholder.svg",
    description: "A romantic novel exploring themes of love, marriage, and social class in Georgian England.",
    owner: "Emily Watson",
    genre: "Romance",
  },
  {
    id: 17,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "/placeholder.svg",
    description: "A tragic story of Jay Gatsby's pursuit of the American Dream in the Jazz Age.",
    owner: "James Morrison",
    genre: "Classic",
  },

  // Educational and Academic Books
  {
    id: 18,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverImage: "/placeholder.svg",
    description: "Comprehensive textbook covering fundamental algorithms and data structures.",
    owner: "Prof. Anna Davis",
    genre: "Computer Science",
  },
  {
    id: 19,
    title: "Campbell Biology",
    author: "Jane B. Reece",
    coverImage: "/placeholder.svg",
    description: "Leading biology textbook covering molecular biology, genetics, evolution, and ecology.",
    owner: "Dr. Mark Johnson",
    genre: "Biology",
  },
  {
    id: 20,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    coverImage: "/placeholder.svg",
    description: "Comprehensive calculus textbook with applications in science and engineering.",
    owner: "Prof. Rachel Kim",
    genre: "Mathematics",
  },
  {
    id: 21,
    title: "A People's History of the United States",
    author: "Howard Zinn",
    coverImage: "/placeholder.svg",
    description: "American history told from the perspective of ordinary people and marginalized groups.",
    owner: "Dr. Thomas Anderson",
    genre: "History",
  },

  // Business and Economics
  {
    id: 22,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    coverImage: "/placeholder.svg",
    description: "Financial education book contrasting different approaches to money and investing.",
    owner: "Carlos Martinez",
    genre: "Finance",
  },
  {
    id: 23,
    title: "The Lean Startup",
    author: "Eric Ries",
    coverImage: "/placeholder.svg",
    description: "Methodology for developing businesses and products through validated learning.",
    owner: "Startup Steve",
    genre: "Business",
  },
  {
    id: 24,
    title: "Freakonomics",
    author: "Steven D. Levitt",
    coverImage: "/placeholder.svg",
    description: "Exploring the hidden side of everything through economic analysis of everyday life.",
    owner: "Economics Emma",
    genre: "Economics",
  },

  // Health and Wellness
  {
    id: 25,
    title: "Becoming",
    author: "Michelle Obama",
    coverImage: "/placeholder.svg",
    description: "Memoir of the former First Lady sharing her journey from Chicago to the White House.",
    owner: "Biography Beth",
    genre: "Biography",
  },
  {
    id: 26,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    coverImage: "/placeholder.svg",
    description: "Personal development book focusing on character-based leadership and effectiveness.",
    owner: "Leadership Larry",
    genre: "Self-Help",
  },

  // Contemporary Fiction
  {
    id: 27,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    coverImage: "/placeholder.svg",
    description: "A powerful story of friendship, betrayal, and redemption set in Afghanistan.",
    owner: "Fiction Fan",
    genre: "Contemporary Fiction",
  },
  {
    id: 28,
    title: "Educated",
    author: "Tara Westover",
    coverImage: "/placeholder.svg",
    description: "Memoir about education, family, and the struggle between loyalty and independence.",
    owner: "Memoir Mike",
    genre: "Memoir",
  },

  // Science Fiction and Fantasy
  {
    id: 29,
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "/placeholder.svg",
    description: "Epic science fiction novel set on the desert planet Arrakis with political intrigue.",
    owner: "Sci-Fi Sam",
    genre: "Science Fiction",
  },
  {
    id: 30,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    coverImage: "/placeholder.svg",
    description: "The magical journey begins as Harry discovers he's a wizard on his 11th birthday.",
    owner: "Magic Mary",
    genre: "Fantasy",
  },
];
