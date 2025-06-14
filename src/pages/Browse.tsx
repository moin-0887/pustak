
import BookCard from '@/components/BookCard';
import { books } from '@/data/books';

const BrowsePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Browse All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
