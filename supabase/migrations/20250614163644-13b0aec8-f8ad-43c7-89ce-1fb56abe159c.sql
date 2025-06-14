
-- Create a table for books listed by users (separate from the main catalog)
CREATE TABLE public.listed_books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  description TEXT,
  cover_url TEXT,
  isbn TEXT,
  condition TEXT NOT NULL DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  publication_year INTEGER,
  price_per_day DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  max_rental_duration INTEGER DEFAULT 30, -- days
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for rental requests
CREATE TABLE public.rental_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.listed_books ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  requested_start_date DATE NOT NULL,
  requested_end_date DATE NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  total_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.listed_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_requests ENABLE ROW LEVEL SECURITY;

-- Listed books policies
CREATE POLICY "Everyone can view listed books" 
  ON public.listed_books FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own listed books" 
  ON public.listed_books FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listed books" 
  ON public.listed_books FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listed books" 
  ON public.listed_books FOR DELETE 
  USING (auth.uid() = user_id);

-- Rental requests policies
CREATE POLICY "Users can view rental requests they're involved in" 
  ON public.rental_requests FOR SELECT 
  USING (auth.uid() = requester_id OR auth.uid() = owner_id);

CREATE POLICY "Users can create rental requests" 
  ON public.rental_requests FOR INSERT 
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Book owners can update rental requests for their books" 
  ON public.rental_requests FOR UPDATE 
  USING (auth.uid() = owner_id OR auth.uid() = requester_id);

-- Update rentals table to support both catalog books and user-listed books
ALTER TABLE public.rentals 
ADD COLUMN listed_book_id UUID REFERENCES public.listed_books ON DELETE CASCADE,
ADD COLUMN rental_request_id UUID REFERENCES public.rental_requests ON DELETE CASCADE;

-- Make book_id nullable since we now have listed_book_id as alternative
ALTER TABLE public.rentals ALTER COLUMN book_id DROP NOT NULL;

-- Add constraint to ensure either book_id or listed_book_id is set
ALTER TABLE public.rentals 
ADD CONSTRAINT rentals_book_reference_check 
CHECK ((book_id IS NOT NULL) != (listed_book_id IS NOT NULL));

-- Insert some sample listed books for testing
INSERT INTO public.listed_books (user_id, title, author, genre, description, condition, publication_year, price_per_day, max_rental_duration) VALUES
((SELECT id FROM auth.users LIMIT 1), 'The Alchemist', 'Paulo Coelho', 'Fiction', 'A philosophical novel about following your dreams.', 'good', 1988, 1.50, 14),
((SELECT id FROM auth.users LIMIT 1), 'Atomic Habits', 'James Clear', 'Self-Help', 'An easy & proven way to build good habits & break bad ones.', 'excellent', 2018, 2.00, 21);
