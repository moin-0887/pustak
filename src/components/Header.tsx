
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Pustak</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <NavLink to="/browse" className={navLinkClass}>
            Browse Books
          </NavLink>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button>
            <LogIn className="mr-2 h-4 w-4" /> Login / Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
