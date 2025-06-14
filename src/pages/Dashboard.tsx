
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, DollarSign, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ListedBookCard from '@/components/ListedBookCard';
import RentalRequestCard from '@/components/RentalRequestCard';

interface ListedBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  price_per_day: number;
  is_available: boolean;
  created_at: string;
}

interface RentalRequest {
  id: string;
  requested_start_date: string;
  requested_end_date: string;
  message: string;
  status: string;
  total_cost: number;
  requester_id: string;
  listed_books: {
    title: string;
    author: string;
  };
}

interface BorrowedBook {
  id: string;
  rental_date: string;
  due_date: string;
  status: string;
  total_cost: number;
  listed_books: {
    title: string;
    author: string;
    user_id: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();

  const { data: listedBooks } = useQuery({
    queryKey: ['listedBooks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('listed_books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ListedBook[];
    },
    enabled: !!user,
  });

  const { data: rentalRequests } = useQuery({
    queryKey: ['rentalRequests', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('rental_requests')
        .select(`
          *,
          listed_books (title, author)
        `)
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as RentalRequest[];
    },
    enabled: !!user,
  });

  const { data: borrowedBooks } = useQuery({
    queryKey: ['borrowedBooks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('rentals')
        .select(`
          *,
          listed_books (title, author, user_id)
        `)
        .eq('user_id', user.id)
        .not('listed_book_id', 'is', null)
        .order('rental_date', { ascending: false });
      if (error) throw error;
      return data as BorrowedBook[];
    },
    enabled: !!user,
  });

  const stats = {
    totalListedBooks: listedBooks?.length || 0,
    activeRentals: borrowedBooks?.filter(b => b.status === 'active').length || 0,
    pendingRequests: rentalRequests?.filter(r => r.status === 'pending').length || 0,
    totalEarnings: rentalRequests?.filter(r => r.status === 'approved').reduce((sum, r) => sum + Number(r.total_cost), 0) || 0,
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
        <p className="text-muted-foreground mb-4">You need to be signed in to view your dashboard.</p>
        <Button asChild>
          <Link to="/auth">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your books and track your activity</p>
        </div>
        <Button asChild>
          <Link to="/list-book">List a Book</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Listed Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalListedBooks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRentals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalEarnings.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="listed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="listed">My Listed Books</TabsTrigger>
          <TabsTrigger value="requests">Rental Requests</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
        </TabsList>

        <TabsContent value="listed" className="space-y-4">
          {!listedBooks || listedBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No books listed yet</h3>
              <p className="text-muted-foreground mb-4">Start earning by listing your books for rent!</p>
              <Button asChild>
                <Link to="/list-book">List Your First Book</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listedBooks.map((book) => (
                <ListedBookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {!rentalRequests || rentalRequests.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No rental requests yet</h3>
              <p className="text-muted-foreground">Requests for your listed books will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rentalRequests.map((request) => (
                <RentalRequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="borrowed" className="space-y-4">
          {!borrowedBooks || borrowedBooks.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No borrowed books</h3>
              <p className="text-muted-foreground mb-4">Books you borrow from other users will appear here.</p>
              <Button asChild>
                <Link to="/browse">Browse Books</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {borrowedBooks.map((rental) => (
                <Card key={rental.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{rental.listed_books.title}</h3>
                        <p className="text-muted-foreground">by {rental.listed_books.author}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm">Rented: {new Date(rental.rental_date).toLocaleDateString()}</span>
                          <span className="text-sm">Due: {new Date(rental.due_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={rental.status === 'active' ? 'default' : 'secondary'}>
                          {rental.status}
                        </Badge>
                        <p className="text-lg font-bold text-primary mt-1">₹{rental.total_cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
