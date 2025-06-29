
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import RecentlyAddedBooks from "@/components/RecentlyAddedBooks";
import UnifiedContactForm from "@/components/UnifiedContactForm";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Homepage component that displays different content based on user authentication status
 * - Shows search functionality and recently added books for all users
 * - Displays different navigation options for authenticated vs non-authenticated users
 * - Includes a unified contact form at the bottom
 */
const Index = () => {
  // Get current user authentication state
  const { user } = useAuth();

  return (
    <div className="space-y-20">
      {/* Hero Section with Search - Main landing area with branding and search */}
      <section className="text-center py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* App branding with logo and title */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <BookOpen className="h-16 w-16 text-primary" />
              <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl font-serif">
                Pustak
              </h1>
            </div>
            
            {/* App description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover, share, and rent books from our growing community. Find your next great read today.
            </p>
            
            {/* Search functionality available to all users */}
            <SearchBar />
            
            {/* Navigation buttons - different options based on authentication status */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                // Authenticated user options - access to browse and learn more
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-4">
                    <Link to="/browse">Browse All Books</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </>
              ) : (
                // Non-authenticated user options - learn about the app or sign up
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-4">
                    <Link to="/about">About Pustak</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                    <Link to="/auth">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Books Section - Showcase latest additions to the library */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-serif mb-4">
              Recently Added Books
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out the latest books added to our community library
            </p>
          </div>
          
          {/* Books grid component */}
          <RecentlyAddedBooks />
          
          {/* Call-to-action to view all books */}
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/browse">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section - Unified form for user inquiries and feedback */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-serif mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to get involved? We'd love to hear from you
            </p>
          </div>
          
          {/* Unified contact form component */}
          <UnifiedContactForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
