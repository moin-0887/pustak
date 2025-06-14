
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BookOpen, Upload } from 'lucide-react';

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  description: string;
  isbn: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  publication_year: number;
  price_per_day: number;
  max_rental_duration: number;
}

const genres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy',
  'Biography', 'History', 'Self-Help', 'Business', 'Technology', 'Health',
  'Travel', 'Cooking', 'Art', 'Music', 'Sports', 'Other'
];

const ListBook = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const form = useForm<BookFormData>({
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      description: '',
      isbn: '',
      condition: 'good',
      publication_year: new Date().getFullYear(),
      price_per_day: 1.0,
      max_rental_duration: 30,
    },
  });

  const onSubmit = async (data: BookFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be signed in to list a book",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let coverUrl = null;

      // Upload cover image if provided
      if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `book-covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('book-covers')
          .upload(filePath, coverImage);

        if (uploadError) {
          console.error('Upload error:', uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('book-covers')
            .getPublicUrl(filePath);
          coverUrl = publicUrl;
        }
      }

      // Insert the book listing
      const { error } = await supabase
        .from('listed_books')
        .insert({
          user_id: user.id,
          title: data.title,
          author: data.author,
          genre: data.genre,
          description: data.description,
          isbn: data.isbn,
          condition: data.condition,
          publication_year: data.publication_year,
          price_per_day: data.price_per_day,
          max_rental_duration: data.max_rental_duration,
          cover_url: coverUrl,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your book has been listed successfully!",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error listing book:', error);
      toast({
        title: "Error",
        description: "Failed to list your book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Please sign in</h2>
        <p className="text-muted-foreground mb-4">You need to be signed in to list a book.</p>
        <Button asChild>
          <a href="/auth">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">List a Book</h1>
        <p className="text-muted-foreground">Share your books with the community and earn money</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genres.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the book (optional)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isbn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ISBN (optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publication_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publication Year</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2024" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price_per_day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Day (₹) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          min="0"
                          placeholder="1.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>How much to charge per day</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="max_rental_duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Rental Duration (days)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          placeholder="30" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Maximum days someone can rent this book</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Book Cover</label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground mb-2">
                    {coverImage ? coverImage.name : 'Upload a cover image (optional)'}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Listing Book...' : 'List Book'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListBook;
