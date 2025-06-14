
import { useParams, Link } from 'react-router-dom';
import { books } from '@/data/books';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Library } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === Number(id));
  const { toast } = useToast();

  if (!book) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/browse">Go back to browsing</Link>
        </Button>
      </div>
    );
  }
  
  const handleBorrow = () => {
    toast({
      title: "Feature coming soon!",
      description: "User authentication is needed to borrow books. We're working on it!",
    })
  }

  return (
    <div>
      <Button asChild variant="outline" className="mb-8">
        <Link to="/browse">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Link>
      </Button>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">{book.genre}</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-serif mt-2 mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>
          <p className="text-base leading-relaxed mb-6">{book.description}</p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-8 space-x-4">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Owner: {book.owner}</span>
            </div>
            <div className="flex items-center">
                <Library className="mr-2 h-4 w-4" />
                <span>Personal Library</span>
            </div>
          </div>
          
          <Button size="lg" onClick={handleBorrow}>Request to Borrow</Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

