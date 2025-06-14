
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import RecentlyAddedBooks from "@/components/RecentlyAddedBooks";
import FeedbackForm from "@/components/FeedbackForm";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section with Search */}
      <section className="text-center py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <BookOpen className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl font-serif">
                Pustak
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, share, and rent books from our growing community. Find your next great read today.
            </p>
            <SearchBar />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/browse">Browse All Books</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added Books */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif mb-4">
              Recently Added Books
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out the latest books added to our community library
            </p>
          </div>
          <RecentlyAddedBooks />
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link to="/browse">View All Books</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif mb-4">
              We Value Your Feedback
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Help us improve Pustak by sharing your thoughts and suggestions
            </p>
          </div>
          <FeedbackForm />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or want to get involved? We'd love to hear from you
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
