import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import ExploreQuran from "./pages/ExploreQuran";
import ExploreArabic from "./pages/ExploreArabic";
import LearnToReadQuran from "./pages/LearnToReadQuran";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Library from "./pages/Library";
import MyCoursesPage from "./pages/dashboard/MyCoursesPage";
import { Certificates } from "./pages/dashboard/PlaceholderPages";
import Favorites from "./pages/dashboard/Favorites";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseEdit from "./pages/admin/AdminCourseEdit";
import AdminInstructors from "./pages/admin/AdminInstructors";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import AdminReviews from "./pages/admin/AdminReviews";
import NotFound from "./pages/NotFound";
import Chrome from "./components/shared/Chrome";

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

            {/* Public courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/library" element={<Library />} />

            {/* Auth */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected — Student */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/courses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
            <Route path="/dashboard/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="/dashboard/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/learn/:slug/:lessonId" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/students" element={<AdminRoute><AdminStudents /></AdminRoute>} />
            <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
            <Route path="/admin/courses/new" element={<AdminRoute><AdminCourseEdit /></AdminRoute>} />
            <Route path="/admin/courses/:id/edit" element={<AdminRoute><AdminCourseEdit /></AdminRoute>} />
            <Route path="/admin/instructors" element={<AdminRoute><AdminInstructors /></AdminRoute>} />
            <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
            <Route path="/admin/analytics" element={<AdminRoute><AdminPlaceholder title="Analytics" description="Engagement, growth, and revenue insights." phase="Phase 4" path="/admin/analytics" /></AdminRoute>} />
            <Route path="/admin/settings" element={<AdminRoute><AdminPlaceholder title="Platform Settings" description="Configure platform-wide options." phase="Phase 4" path="/admin/settings" /></AdminRoute>} />

            {/* Article pages */}
            <Route path="/articles/hifz-quran" element={<HifzQuran />} />
            <Route path="/articles/tajweed" element={<Tajweed />} />
            <Route path="/articles/learn-arabic" element={<LearnArabic />} />

            {/* Legacy URL redirects */}
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
