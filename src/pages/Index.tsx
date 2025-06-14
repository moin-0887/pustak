
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookCheck, Maximize, MessageSquare, Award } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <BookCheck className="h-8 w-8 text-primary" />,
    title: "Encourage Reading Habits",
    description: "Develop a culture of reading among students to enhance their focus and analytical thinking.",
  },
  {
    icon: <Maximize className="h-8 w-8 text-primary" />,
    title: "Maximize Book Utilization",
    description: "Ensure that personal book collections are effectively shared and utilized through an online platform.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Facilitate Peer Learning",
    description: "Enable discussions based on reading profiles to promote knowledge sharing and diverse perspectives.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Enhance Cognitive Skills",
    description: "Support deeper learning and comprehension through sustained reading efforts.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-serif">
              Welcome to Pustak
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              An initiative aimed at improving students' ability to achieve deeper focus by inculcating the habit of reading books. Share your personal library and discover new worlds, one book at a time.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/browse">Start Browsing Books</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="max-w-xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif">Key Objectives</h2>
            <p className="mt-4 text-muted-foreground">
              Our goal is to build a vibrant community of readers and learners.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="text-left">
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-serif">More Than a Platform</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              PUSTAK is a movement to cultivate the habit of reading and enhance students' ability to focus. By leveraging technology and community-driven participation, this initiative has the potential to transform the way students interact with books and knowledge.
            </p>
            <div className="mt-8">
                <Button asChild size="lg" variant="outline">
                    <Link to="/browse">Join the Movement</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

