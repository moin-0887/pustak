
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Rental {
  id: string;
  rental_date: string;
  due_date: string;
  return_date: string | null;
  status: 'active' | 'returned' | 'overdue';
  total_cost: number;
  books: {
    id: string;
    title: string;
    author: string;
    cover_url: string;
    genre: string;
  };
}

const MyBooksPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: rentals, isLoading, refetch } = useQuery({
    queryKey: ['myRentals', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('rentals')
        .select(`
          id,
          rental_date,
          due_date,
          return_date,
          status,
          total_cost,
          books (
            id,
            title,
            author,
            cover_url,
            genre
          )
        `)
        .eq('user_id', user.id)
        .order('rental_date', { ascending: false });

      if (error) throw error;
      return data as Rental[];
    },
    enabled: !!user,
  });

  const handleReturnBook = async (rentalId: string) => {
    const { error } = await supabase
      .from('rentals')
      .update({ 
        status: 'returned',
        return_date: new Date().toISOString()
      })
      .eq('id', rentalId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to return book",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Book returned successfully!",
      });
      refetch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'returned': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
        <p className="text-muted-foreground mb-4">You need to be signed in to view your books.</p>
        <Button asChild>
          <a href="/auth">Sign In</a>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading your books...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Books</h1>
        <p className="text-muted-foreground">Manage your rented books and rental history</p>
      </div>

      {!rentals || rentals.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No books rented yet</h2>
          <p className="text-muted-foreground mb-4">Start exploring our collection and rent your first book!</p>
          <Button asChild>
            <a href="/browse">Browse Books</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {rentals.map((rental) => (
            <Card key={rental.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-32 h-48 md:h-auto">
                  <img 
                    src={rental.books.cover_url || '/placeholder.svg'} 
                    alt={rental.books.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{rental.books.title}</CardTitle>
                        <p className="text-muted-foreground">by {rental.books.author}</p>
                        <Badge variant="secondary" className="mt-1">
                          {rental.books.genre}
                        </Badge>
                      </div>
                      <Badge className={getStatusColor(rental.status)}>
                        {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rented</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(rental.rental_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Due Date</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(rental.due_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Total Cost</p>
                        <p className="text-lg font-bold text-primary">
                          ₹{rental.total_cost}
                        </p>
                      </div>
                    </div>
                    {rental.status === 'active' && (
                      <Button 
                        onClick={() => handleReturnBook(rental.id)}
                        variant="outline"
                      >
                        Return Book
                      </Button>
                    )}
                    {rental.return_date && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Returned on {new Date(rental.return_date).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooksPage;
