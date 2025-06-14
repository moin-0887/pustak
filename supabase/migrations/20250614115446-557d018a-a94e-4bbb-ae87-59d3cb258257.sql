
-- Create a profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a books table for the actual book inventory
CREATE TABLE public.books (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT,
  description TEXT,
  cover_url TEXT,
  isbn TEXT UNIQUE,
  available_copies INTEGER NOT NULL DEFAULT 0,
  total_copies INTEGER NOT NULL DEFAULT 0,
  price_per_day DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a rentals table to track book rentals
CREATE TABLE public.rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books ON DELETE CASCADE,
  rental_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  return_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned', 'overdue')),
  total_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Books policies (public read access)
CREATE POLICY "Books are viewable by everyone" 
  ON public.books FOR SELECT 
  USING (true);

-- Rentals policies
CREATE POLICY "Users can view their own rentals" 
  ON public.rentals FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rentals" 
  ON public.rentals FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rentals" 
  ON public.rentals FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample books
INSERT INTO public.books (title, author, genre, description, cover_url, isbn, available_copies, total_copies, price_per_day) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic Fiction', 'A classic American novel set in the Jazz Age.', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&h=400', '9780743273565', 3, 5, 2.50),
('To Kill a Mockingbird', 'Harper Lee', 'Literary Fiction', 'A gripping tale of racial injustice and childhood innocence.', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&h=400', '9780061120084', 2, 4, 2.00),
('1984', 'George Orwell', 'Dystopian Fiction', 'A dystopian social science fiction novel and cautionary tale.', 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=300&h=400', '9780451524935', 4, 6, 3.00),
('Pride and Prejudice', 'Jane Austen', 'Romance', 'A romantic novel of manners set in Georgian England.', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=300&h=400', '9780141439518', 1, 3, 2.25),
('The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age Fiction', 'A controversial novel narrated by a cynical teenager.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=400', '9780316769174', 2, 4, 2.75);
