
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, EyeOff } from 'lucide-react';

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

interface ListedBookCardProps {
  book: ListedBook;
}

const ListedBookCard = ({ book }: ListedBookCardProps) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
          <div className="flex items-center space-x-2">
            {book.is_available ? (
              <Eye className="h-4 w-4 text-green-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {book.genre && (
            <Badge variant="secondary">{book.genre}</Badge>
          )}
          <Badge className={getConditionColor(book.condition)}>
            {book.condition}
          </Badge>
          <Badge variant={book.is_available ? 'default' : 'secondary'}>
            {book.is_available ? 'Available' : 'Unavailable'}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-primary">₹{book.price_per_day}</p>
            <p className="text-sm text-muted-foreground">per day</p>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Listed on {new Date(book.created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default ListedBookCard;
