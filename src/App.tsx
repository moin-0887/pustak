
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import BrowsePage from "./pages/Browse";
import BookDetailPage from "./pages/BookDetail";
import AuthPage from "./pages/Auth";
import MyBooksPage from "./pages/MyBooks";
import Dashboard from "./pages/Dashboard";
import ListBook from "./pages/ListBook";
import Requests from "./pages/Requests";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/my-books" element={<MyBooksPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/list-book" element={<ListBook />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
