
export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  owner: string;
  genre: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "/placeholder.svg",
    description: "A philosophical book about following your dreams.",
    owner: "Alex Doe",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "/placeholder.svg",
    description: "An exploration of the history of Homo sapiens.",
    owner: "Jane Smith",
    genre: "Non-Fiction",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "/placeholder.svg",
    description: "A classic novel dealing with racial injustice in the American South.",
    owner: "Peter Jones",
    genre: "Classic",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    coverImage: "/placeholder.svg",
    description: "A dystopian novel set in a totalitarian society.",
    owner: "Mary Williams",
    genre: "Dystopian",
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "/placeholder.svg",
    description: "A fantasy novel about the adventures of Bilbo Baggins.",
    owner: "David Brown",
    genre: "Fantasy",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/placeholder.svg",
    description: "A guide to building good habits and breaking bad ones.",
    owner: "Susan Garcia",
    genre: "Self-Help",
  },
];
