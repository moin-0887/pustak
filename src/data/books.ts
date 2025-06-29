
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
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "A philosophical book about following your dreams and discovering your personal legend. Santiago, a young shepherd, embarks on a journey to find treasure in Egypt, learning about life, love, and the importance of listening to one's heart.",
    owner: "Alex Doe",
    genre: "Fiction",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    description: "A fantasy novel about the adventures of Bilbo Baggins in Middle-earth. Join Bilbo as he embarks on an unexpected journey with thirteen dwarves and the wizard Gandalf to reclaim the lost Dwarf Kingdom of Erebor from the dragon Smaug.",
    owner: "David Brown",
    genre: "Fantasy",
  },

  // Non-Fiction and Educational Books
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "An exploration of the history of Homo sapiens from the Stone Age to the modern era. Harari examines how three major revolutions—cognitive, agricultural, and scientific—have affected humans and their fellow organisms.",
    owner: "Jane Smith",
    genre: "Non-Fiction",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
    description: "A comprehensive guide to building good habits and breaking bad ones through small changes. Clear provides a proven framework for improving every day, revealing how tiny changes in behavior can transform your life and deliver remarkable results.",
    owner: "Susan Garcia",
    genre: "Self-Help",
  },
  {
    id: 7,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "A groundbreaking exploration of the two systems that drive the way we think and make decisions. Kahneman exposes the extraordinary capabilities and biases of fast thinking, and reveals the pervasive influence of intuitive impressions on our thoughts and behavior.",
    owner: "Robert Chen",
    genre: "Psychology",
  },
  {
    id: 8,
    title: "The Feynman Lectures on Physics",
    author: "Richard P. Feynman",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    description: "Classic physics textbook covering mechanics, radiation, heat, quantum mechanics, and more. Based on lectures given by Nobel Prize winner Richard Feynman, this comprehensive text provides clear explanations of fundamental physics concepts.",
    owner: "Dr. Sarah Wilson",
    genre: "Science",
  },
  {
    id: 9,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    description: "An accessible introduction to cosmology, black holes, and the nature of time and space. Hawking attempts to explain a range of subjects in cosmology, including the Big Bang, black holes, and light cones, to the general reader.",
    owner: "Michael Torres",
    genre: "Science",
  },
  {
    id: 10,
    title: "The Art of War",
    author: "Sun Tzu",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description: "Ancient Chinese military treatise on strategy, tactics, and philosophy of warfare. This influential work on strategy and conflict management has applications far beyond the military, including business, politics, and personal development.",
    owner: "Kevin Liu",
    genre: "Philosophy",
  },

  // Religious Books
  {
    id: 11,
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "A Christian guide to discovering God's purpose for your life through 40 days of reflection. Warren presents a biblically-based answer to life's most fundamental question: What on earth am I here for? This book helps readers understand God's incredible plan for their lives.",
    owner: "Pastor John Miller",
    genre: "Religious",
  },
  {
    id: 12,
    title: "Mere Christianity",
    author: "C.S. Lewis",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "A rational explanation of Christian faith, exploring morality, belief, and salvation. Lewis argues for the logical validity of Christianity and discusses moral law, Christian behavior, and the core Christian beliefs in an accessible way.",
    owner: "Margaret Thompson",
    genre: "Religious",
  },
  {
    id: 13,
    title: "The Quran: A New Translation",
    author: "M.A.S. Abdel Haleem",
    coverImage: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=600&fit=crop",
    description: "A modern English translation of the Quran with commentary and explanatory notes. This translation aims to present the Quran in clear, contemporary English while preserving the beauty and meaning of the original Arabic text.",
    owner: "Ahmed Hassan",
    genre: "Religious",
  },
  {
    id: 14,
    title: "The Bhagavad Gita",
    author: "Paramahansa Yogananda",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description: "Ancient Hindu scripture exploring duty, righteousness, and the path to spiritual realization. This sacred text presents a dialogue between Prince Arjuna and Lord Krishna on the battlefield, discussing the nature of reality, duty, and liberation.",
    owner: "Priya Sharma",
    genre: "Religious",
  },
  {
    id: 15,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "A spiritual guide to enlightenment through living in the present moment. Tolle shows readers how to recognize themselves as the creators of their own pain and how to have a pain-free identity by living fully in the present.",
    owner: "Lisa Rodriguez",
    genre: "Spirituality",
  },

  // Classic Literature
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "A classic novel dealing with racial injustice in the American South through a child's eyes. The story follows Scout Finch as she grows up in Alabama during the 1930s, witnessing her father defend a black man falsely accused of rape.",
    owner: "Peter Jones",
    genre: "Classic",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    description: "A dystopian novel set in a totalitarian society exploring surveillance and control. Winston Smith struggles with oppression in Oceania, where the Party scrutinizes human actions with ever-watchful Big Brother.",
    owner: "Mary Williams",
    genre: "Dystopian",
  },
  {
    id: 16,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "A romantic novel exploring themes of love, marriage, and social class in Georgian England. The story follows Elizabeth Bennet as she navigates issues of manners, upbringing, morality, education, and marriage in her society.",
    owner: "Emily Watson",
    genre: "Romance",
  },
  {
    id: 17,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "A tragic story of Jay Gatsby's pursuit of the American Dream in the Jazz Age. Set in the summer of 1922, the novel follows Nick Carraway's interactions with his mysterious neighbor Jay Gatsby and Gatsby's obsession with his former lover Daisy Buchanan.",
    owner: "James Morrison",
    genre: "Classic",
  },

  // Educational and Academic Books
  {
    id: 18,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop",
    description: "Comprehensive textbook covering fundamental algorithms and data structures. This book provides a comprehensive introduction to the modern study of computer algorithms, covering sorting, data structures, graph algorithms, and much more.",
    owner: "Prof. Anna Davis",
    genre: "Computer Science",
  },
  {
    id: 19,
    title: "Campbell Biology",
    author: "Jane B. Reece",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    description: "Leading biology textbook covering molecular biology, genetics, evolution, and ecology. This comprehensive text presents the latest research and applications in biology, helping students understand the connections between biological concepts.",
    owner: "Dr. Mark Johnson",
    genre: "Biology",
  },
  {
    id: 20,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    description: "Comprehensive calculus textbook with applications in science and engineering. Stewart's clear, direct writing style and problem-solving focus make this text a favorite among instructors and students alike.",
    owner: "Prof. Rachel Kim",
    genre: "Mathematics",
  },
  {
    id: 21,
    title: "A People's History of the United States",
    author: "Howard Zinn",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "American history told from the perspective of ordinary people and marginalized groups. Zinn presents American history through the eyes of those who were excluded from traditional histories: women, Native Americans, slaves, and laborers.",
    owner: "Dr. Thomas Anderson",
    genre: "History",
  },

  // Business and Economics
  {
    id: 22,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
    description: "Financial education book contrasting different approaches to money and investing. Kiyosaki shares the story of his two 'dads': his real father and the father of his best friend, and the ways in which both men shaped his thoughts about money and investing.",
    owner: "Carlos Martinez",
    genre: "Finance",
  },
  {
    id: 23,
    title: "The Lean Startup",
    author: "Eric Ries",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Methodology for developing businesses and products through validated learning. Ries presents a scientific approach to creating and managing successful startups in an age when companies need to innovate more than ever.",
    owner: "Startup Steve",
    genre: "Business",
  },
  {
    id: 24,
    title: "Freakonomics",
    author: "Steven D. Levitt",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
    description: "Exploring the hidden side of everything through economic analysis of everyday life. Levitt and Dubner explore the economics of drug dealing, the truth about real estate agents, and what school teachers and sumo wrestlers have in common.",
    owner: "Economics Emma",
    genre: "Economics",
  },

  // Health and Wellness
  {
    id: 25,
    title: "Becoming",
    author: "Michelle Obama",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "Memoir of the former First Lady sharing her journey from Chicago to the White House. Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood to her years as an executive balancing the demands of motherhood and work.",
    owner: "Biography Beth",
    genre: "Biography",
  },
  {
    id: 26,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop",
    description: "Personal development book focusing on character-based leadership and effectiveness. Covey presents a holistic, integrated, principle-centered approach for solving personal and professional problems.",
    owner: "Leadership Larry",
    genre: "Self-Help",
  },

  // Contemporary Fiction
  {
    id: 27,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    description: "A powerful story of friendship, betrayal, and redemption set in Afghanistan. The novel follows Amir as he struggles with his past and the haunting guilt of betraying his servant's son Hassan in 1970s Kabul.",
    owner: "Fiction Fan",
    genre: "Contemporary Fiction",
  },
  {
    id: 28,
    title: "Educated",
    author: "Tara Westover",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    description: "Memoir about education, family, and the struggle between loyalty and independence. Westover recounts her journey from growing up in a survivalist Mormon family to earning a PhD from Cambridge University.",
    owner: "Memoir Mike",
    genre: "Memoir",
  },

  // Science Fiction and Fantasy
  {
    id: 29,
    title: "Dune",
    author: "Frank Herbert",
    coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    description: "Epic science fiction novel set on the desert planet Arrakis with political intrigue. The story follows Paul Atreides as his family accepts control of the desert planet Arrakis, the only source of the 'spice' melange, the most important substance in the universe.",
    owner: "Sci-Fi Sam",
    genre: "Science Fiction",
  },
  {
    id: 30,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    description: "The magical journey begins as Harry discovers he's a wizard on his 11th birthday. On his birthday, Harry Potter learns that he is the son of two well-known wizards, from whom he has inherited magical powers, and is invited to attend Hogwarts School of Witchcraft and Wizardry.",
    owner: "Magic Mary",
    genre: "Fantasy",
  },
];
