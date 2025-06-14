
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  cover_url: string;
  available_copies: number;
  price_per_day: number;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] bg-muted flex items-center justify-center overflow-hidden">
          <img 
            src={book.cover_url || '/placeholder.svg'} 
            alt={`Cover of ${book.title}`} 
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {book.genre}
          </Badge>
        </div>
        <CardTitle className="text-lg mb-1 line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {book.available_copies > 0 ? `${book.available_copies} available` : 'Out of stock'}
          </span>
          <span className="font-semibold text-primary">
            ₹{book.price_per_day}/day
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" disabled={book.available_copies === 0}>
          <Link to={`/book/${book.id}`}>
            {book.available_copies > 0 ? 'View Details' : 'Out of Stock'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
