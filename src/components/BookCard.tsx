
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from '@/data/books';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-[3/4] bg-muted flex items-center justify-center">
            <img src={book.coverImage} alt={`Cover of ${book.title}`} className="object-cover w-full h-full"/>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg mb-1 line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/book/${book.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
