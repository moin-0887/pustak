
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

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
  user_id: string;
  created_at: string;
}

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const { data: book, isLoading } = useQuery({
    queryKey: ['listedBook', id],
    queryFn: async () => {
      if (!id) throw new Error('Book ID is required');
      const { data, error } = await supabase
        .from('listed_books')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as ListedBook;
    },
    enabled: !!id,
  });

  const requestRentalMutation = useMutation({
    mutationFn: async () => {
      if (!user || !book || !startDate || !endDate) {
        throw new Error('Missing required information');
      }

      // Calculate total cost
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const totalCost = days * book.price_per_day;

      const { error } = await supabase
        .from('rental_requests')
        .insert({
          requester_id: user.id,
          book_id: book.id,
          owner_id: book.user_id,
          requested_start_date: startDate,
          requested_end_date: endDate,
          message: message || null,
          total_cost: totalCost,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Request Sent!",
        description: "Your rental request has been sent to the book owner.",
      });
      setShowRequestForm(false);
      setStartDate('');
      setEndDate('');
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['rentalRequests'] });
    },
    onError: (error) => {
      console.error('Error sending rental request:', error);
      toast({
        title: "Error",
        description: "Failed to send rental request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRequestRental = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to request a book rental.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    setShowRequestForm(true);
  };

  const handleSubmitRequest = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      toast({
        title: "Invalid start date",
        description: "Start date cannot be in the past.",
        variant: "destructive",
      });
      return;
    }

    if (end <= start) {
      toast({
        title: "Invalid end date",
        description: "End date must be after start date.",
        variant: "destructive",
      });
      return;
    }

    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (book && days > book.max_rental_duration) {
      toast({
        title: "Rental period too long",
        description: `Maximum rental duration is ${book.max_rental_duration} days.`,
        variant: "destructive",
      });
      return;
    }

    requestRentalMutation.mutate();
  };

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
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Button asChild variant="link">
          <Link to="/browse">Go back to browsing</Link>
        </Button>
      </div>
    );
  }

  const isOwnBook = user?.id === book.user_id;

  return (
    <div className="max-w-6xl mx-auto">
      <Button asChild variant="outline" className="mb-8">
        <Link to="/browse">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {book.cover_url ? (
            <img 
              src={book.cover_url} 
              alt={`Cover of ${book.title}`} 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">No cover image</span>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">{book.genre}</p>
            <h1 className="text-4xl lg:text-5xl font-bold font-serif mt-2 mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={getConditionColor(book.condition)}>
                {book.condition}
              </Badge>
              <Badge variant={book.is_available ? 'default' : 'secondary'}>
                {book.is_available ? 'Available' : 'Not Available'}
              </Badge>
              {book.publication_year && (
                <Badge variant="outline">
                  {book.publication_year}
                </Badge>
              )}
            </div>
          </div>

          {book.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-base leading-relaxed">{book.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center text-2xl font-bold text-primary">
              ₹{book.price_per_day}
              <span className="text-base font-normal text-muted-foreground ml-2">per day</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Maximum rental duration: {book.max_rental_duration} days
            </p>
          </div>

          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Listed by book owner</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Listed on {new Date(book.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {book.isbn && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">ISBN</h3>
              <p>{book.isbn}</p>
            </div>
          )}

          {!isOwnBook && book.is_available && (
            <div className="space-y-4">
              {!showRequestForm ? (
                <Button size="lg" onClick={handleRequestRental} className="w-full sm:w-auto">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request to Rent This Book
                </Button>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Request Book Rental</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    
                    {startDate && endDate && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <strong>Total Cost:</strong> ₹{Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) * book.price_per_day}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ({Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days × ₹{book.price_per_day}/day)
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                      <Textarea
                        placeholder="Add a message to the book owner..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSubmitRequest}
                        disabled={requestRentalMutation.isPending}
                        className="flex-1"
                      >
                        {requestRentalMutation.isPending ? 'Sending...' : 'Send Request'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowRequestForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {isOwnBook && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">This is your own book listing.</p>
            </div>
          )}

          {!book.is_available && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">This book is currently not available for rental.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
