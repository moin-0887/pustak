
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ListedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  cover_url: string;
  isbn: string;
  condition: string;
  publication_year: number;
  price_per_day: number;
  max_rental_duration: number;
  is_available: boolean;
  created_at: string;
}

const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');

  const { data: books, isLoading } = useQuery({
    queryKey: ['listedBooks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listed_books')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ListedBook[];
    },
  });

  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesCondition = selectedCondition === 'all' || book.condition === selectedCondition;
    return matchesSearch && matchesGenre && matchesCondition;
  }) || [];

  const genres = Array.from(new Set(books?.map(book => book.genre).filter(Boolean))) || [];
  const conditions = ['excellent', 'good', 'fair', 'poor'];

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
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Browse Available Books</h1>
        <p className="text-muted-foreground mb-6">Discover books available for rent from our community</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books, authors, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {conditions.map(condition => (
                <SelectItem key={condition} value={condition}>
                  {condition.charAt(0).toUpperCase() + condition.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No books found matching your criteria.</p>
          <Button asChild>
            <Link to="/list-book">Be the first to list a book!</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
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

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{book.price_per_day}</span>
                      <span className="text-xs text-muted-foreground">per day</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max: {book.max_rental_duration} days
                    </p>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Listed {new Date(book.created_at).toLocaleDateString()}</span>
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
      )}
    </div>
  );
};

export default BrowsePage;
