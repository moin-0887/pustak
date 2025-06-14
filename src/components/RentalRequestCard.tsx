
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, User, MessageSquare, DollarSign } from 'lucide-react';

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

  const updateRequestMutation = useMutation({
    mutationFn: async (status: string) => {
      const { error } = await supabase
        .from('rental_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', request.id);

      if (error) throw error;
    },
    onSuccess: (_, status) => {
      toast({
        title: status === 'approved' ? "Request Approved!" : "Request Rejected",
        description: `The rental request has been ${status}.`,
      });
      queryClient.invalidateQueries({ queryKey: ['rentalRequests'] });
    },
    onError: (error) => {
      console.error('Error updating rental request:', error);
      toast({
        title: "Error",
        description: "Failed to update the rental request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleApprove = () => {
    updateRequestMutation.mutate('approved');
  };

  const handleReject = () => {
    updateRequestMutation.mutate('rejected');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Rental Period</p>
                <p className="text-muted-foreground">
                  {formatDate(request.requested_start_date)} - {formatDate(request.requested_end_date)}
                </p>
                <p className="text-xs text-muted-foreground">
                  ({calculateDays()} days)
                </p>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Total Cost</p>
                <p className="text-lg font-bold text-primary">₹{request.total_cost}</p>
              </div>
            </div>
          </div>

          {request.message && (
            <div className="space-y-2">
              <div className="flex items-start text-sm">
                <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Message from requester</p>
                  <p className="text-muted-foreground bg-muted p-2 rounded text-sm mt-1">
                    {request.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {request.status === 'pending' && (
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={handleApprove}
              disabled={updateRequestMutation.isPending}
              className="flex-1"
            >
              Approve
            </Button>
            <Button 
              variant="outline"
              onClick={handleReject}
              disabled={updateRequestMutation.isPending}
              className="flex-1"
            >
              Reject
            </Button>
          </div>
        )}

        {request.status !== 'pending' && (
          <div className="pt-2 text-sm text-muted-foreground">
            Request {request.status} • No further action needed
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RentalRequestCard;
