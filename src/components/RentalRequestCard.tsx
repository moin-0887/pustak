
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

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

interface RentalRequestCardProps {
  request: RentalRequest;
}

const RentalRequestCard = ({ request }: RentalRequestCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('rental_requests')
        .update({ status })
        .eq('id', request.id);

      if (error) throw error;

      // If approved, create a rental record
      if (status === 'approved') {
        const { error: rentalError } = await supabase
          .from('rentals')
          .insert({
            user_id: request.requester_id,
            rental_request_id: request.id,
            rental_date: request.requested_start_date,
            due_date: request.requested_end_date,
            total_cost: request.total_cost,
            status: 'active'
          });

        if (rentalError) throw rentalError;
      }

      toast({
        title: "Success",
        description: `Request ${status} successfully!`,
      });

      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['rentalRequests'] });
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDays = () => {
    const start = new Date(request.requested_start_date);
    const end = new Date(request.requested_end_date);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{request.listed_books.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {request.listed_books.author}</p>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(request.requested_start_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(request.requested_end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-sm text-muted-foreground">{calculateDays()} days</p>
          </div>
        </div>

        <div>
          <p className="text-lg font-bold text-primary">Total: ₹{request.total_cost}</p>
        </div>

        {request.message && (
          <div className="flex items-start space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
            <div>
              <p className="text-sm font-medium">Message from requester:</p>
              <p className="text-sm text-muted-foreground">{request.message}</p>
            </div>
          </div>
        )}

        {request.status === 'pending' && (
          <div className="flex space-x-2">
            <Button 
              onClick={() => handleStatusUpdate('approved')}
              size="sm"
              className="flex-1"
            >
              Approve
            </Button>
            <Button 
              onClick={() => handleStatusUpdate('rejected')}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RentalRequestCard;
