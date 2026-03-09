import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ExploreQuran from "./pages/ExploreQuran";
import ExploreArabic from "./pages/ExploreArabic";
import LearnToReadQuran from "./pages/LearnToReadQuran";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

// Article pages
import HifzQuran from "./pages/articles/HifzQuran";
import Tajweed from "./pages/articles/Tajweed";
import LearnArabic from "./pages/articles/LearnArabic";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/quran" element={<ExploreQuran />} />
          <Route path="/explore/arabic" element={<ExploreArabic />} />
          <Route
            path="/explore/learntoreadquran"
            element={<LearnToReadQuran />}
          />
          <Route path="/contact" element={<Contact />} />
          {/* Article pages */}
          <Route path="/articles/hifz-quran" element={<HifzQuran />} />
          <Route path="/articles/tajweed" element={<Tajweed />} />
          <Route path="/articles/learn-arabic" element={<LearnArabic />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
