
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import RecentlyAddedBooks from "@/components/RecentlyAddedBooks";
import UnifiedContactForm from "@/components/UnifiedContactForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-20">
      {/* Hero Section with Search */}
      <section className="text-center py-24 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <BookOpen className="h-16 w-16 text-primary" />
              <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl font-serif">
                Pustak
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover, share, and rent books from our growing community. Find your next great read today.
            </p>
            <SearchBar />
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {user ? (
                <>
                  <Button asChild size="lg" className="text-lg px-8 py-4">
                    <Link to="/browse">Browse All Books</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </>
              ) : (
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

      {/* Recently Added Books */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-serif mb-4">
              Recently Added Books
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out the latest books added to our community library
            </p>
          </div>
          <RecentlyAddedBooks />
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/browse">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl font-serif mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or want to get involved? We'd love to hear from you
            </p>
          </div>
          <UnifiedContactForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
