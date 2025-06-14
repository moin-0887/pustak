
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Pustak</h2>
          </div>
          
          {/* Copyright and Mission */}
          <div className="space-y-2 max-w-md">
            <p className="text-sm text-muted-foreground">
              © 2025 Pustak. A movement to bring back the joy of reading.
            </p>
            <p className="text-xs text-muted-foreground">
              Inspired by Sant Shiromani Ravidas, Global Skills Park, Bhopal, Madhya Pradesh.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
