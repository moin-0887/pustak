
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ListedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover_url: string;
  condition: string;
  price_per_day: number;
  created_at: string;
}

const RecentlyAddedBooks = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: ['recentBooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listed_books')
        .select('id, title, author, genre, cover_url, condition, price_per_day, created_at')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data as ListedBook[];
    },
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-lg mb-3"></div>
            <div className="bg-muted h-4 rounded mb-2"></div>
            <div className="bg-muted h-3 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No books available yet.</p>
        <Button asChild>
          <Link to="/list-book">Be the first to list a book!</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Card key={book.id} className="h-full flex flex-col">
          <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
            {book.cover_url ? (
              <img 
                src={book.cover_url} 
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
          </div>
          
          <CardContent className="flex-1 p-4">
            <div className="space-y-2">
              <h3 className="font-semibold line-clamp-2 text-sm">{book.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">by {book.author}</p>
              
              <div className="flex flex-wrap gap-1">
                {book.genre && (
                  <Badge variant="secondary" className="text-xs">{book.genre}</Badge>
                )}
                <Badge className={`text-xs ${getConditionColor(book.condition)}`}>
                  {book.condition}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">₹{book.price_per_day}</span>
                <span className="text-xs text-muted-foreground">per day</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button asChild size="sm" className="w-full">
              <Link to={`/book/${book.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecentlyAddedBooks;
