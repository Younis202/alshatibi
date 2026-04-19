import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/hooks/useGamification";
import CourseCard from "@/components/courses/CourseCard";
import { Heart, ArrowRight, Loader2 } from "lucide-react";

const Favorites = () => {
  const { user } = useAuth();
  const { data: favorites, isLoading } = useFavorites(user?.id);

  return (
    <>
      <Seo
        title="Favorites | Al Shatibi Academy"
        description="Courses and lessons you've saved for later."
        path="/dashboard/favorites"
      />
      <DashboardLayout>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-accent" fill="currentColor" />
            </div>
            <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight">
              Favorites
            </h1>
          </div>
          <p className="text-grey-brand/60 font-sans text-lg max-w-2xl">
            All the courses you've bookmarked — your private library to come back to anytime.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
          </div>
        ) : favorites && favorites.length > 0 ? (
          <>
            <div className="text-grey-brand/55 text-sm font-sans mb-5">
              {favorites.length} saved course{favorites.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {favorites.map((f: any) =>
                f.courses ? <CourseCard key={f.id} course={f.courses} /> : null
              )}
            </div>
          </>
        ) : (
          <div className="bg-[#4D0B00] rounded-2xl p-12 md:p-16 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
              <Heart className="w-7 h-7 text-red-accent" />
            </div>
            <h2 className="font-heading font-light text-2xl md:text-3xl text-grey-brand mb-2">
              No favorites yet
            </h2>
            <p className="text-grey-brand/60 font-sans max-w-lg mx-auto mb-7">
              Tap the heart icon on any course to save it for later.
            </p>
            <Link
              to="/courses"
              className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2"
            >
              <span>Browse Courses</span> <ArrowRight className="w-4 h-4 icon" />
            </Link>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default Favorites;
