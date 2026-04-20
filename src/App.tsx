import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRoute from "./components/auth/AdminRoute";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ExploreQuran from "./pages/ExploreQuran";
import ExploreArabic from "./pages/ExploreArabic";
import LearnToReadQuran from "./pages/LearnToReadQuran";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Enroll from "./pages/Enroll";
import EnrollSuccess from "./pages/EnrollSuccess";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import NotFound from "./pages/NotFound";
import Chrome from "./components/shared/Chrome";

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
        <AuthProvider>
          <ScrollToTop />
          <Chrome>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/explore/quran" element={<ExploreQuran />} />
              <Route path="/explore/arabic" element={<ExploreArabic />} />
              <Route path="/explore/learntoreadquran" element={<LearnToReadQuran />} />
              <Route path="/contact" element={<Contact />} />

              {/* Lead-gen flow */}
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/enroll/success" element={<EnrollSuccess />} />

              {/* Auth (admin only — students don't sign in to this site) */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>} />
              <Route path="/admin/testimonials" element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><AdminPlaceholder title="Platform Settings" description="Configure platform-wide options." phase="Phase 4" path="/admin/settings" /></AdminRoute>} />

              {/* Article pages */}
              <Route path="/articles/hifz-quran" element={<HifzQuran />} />
              <Route path="/articles/tajweed" element={<Tajweed />} />
              <Route path="/articles/learn-arabic" element={<LearnArabic />} />

              {/* Legacy URL redirects → enroll */}
              <Route path="/courses" element={<Navigate to="/enroll" replace />} />
              <Route path="/courses/:slug" element={<Navigate to="/enroll" replace />} />
              <Route path="/library" element={<Navigate to="/enroll" replace />} />
              <Route path="/dashboard" element={<Navigate to="/enroll" replace />} />
              <Route path="/dashboard/*" element={<Navigate to="/enroll" replace />} />
              <Route path="/profile" element={<Navigate to="/enroll" replace />} />
              <Route path="/settings" element={<Navigate to="/enroll" replace />} />
              <Route path="/learn/*" element={<Navigate to="/enroll" replace />} />
              <Route path="/explore-quran" element={<Navigate to="/explore/quran" replace />} />
              <Route path="/explore-arabic" element={<Navigate to="/explore/arabic" replace />} />
              <Route path="/learn-to-read-quran" element={<Navigate to="/explore/learntoreadquran" replace />} />
              <Route path="/explore/learn-to-read-quran" element={<Navigate to="/explore/learntoreadquran" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Chrome>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
