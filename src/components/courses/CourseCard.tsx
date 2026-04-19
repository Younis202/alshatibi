import { Link } from "react-router-dom";
import { Star, Users, Clock, Play } from "lucide-react";
import { formatDuration } from "@/hooks/useCourses";
import FavoriteButton from "@/components/courses/FavoriteButton";

interface Props {
  course: {
    id: string;
    slug: string;
    title: string;
    subtitle: string | null;
    thumbnail_url: string | null;
    is_premium: boolean;
    price: number;
    duration_minutes: number;
    enrollment_count: number;
    rating: number;
    rating_count: number;
    level: string;
    instructors?: { name: string; avatar_url: string | null } | null;
    categories?: { name: string } | null;
  };
}

const PremiumBadge = () => (
  <div className="absolute flex top-4 left-4 gap-x-1 lg:gap-x-1.5 items-center px-2 py-1 sm:py-1.5 rounded-md bg-black/85">
    <svg className="w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
      <path fill="#CC2002" stroke="#CC2002" strokeWidth=".25" d="M.36 6.589a.433.433 0 0 0 .028.551L9.92 17.595a.428.428 0 0 0 .32.142.428.428 0 0 0 .32-.141l.001-.001L20.09 7.14h.001a.433.433 0 0 0 .028-.552L15.505.439l-.1.074.1-.074a.435.435 0 0 0-.346-.173H5.32a.435.435 0 0 0-.347.173L.361 6.589Z"/>
    </svg>
    <span className="inline-block text-[10px] uppercase mt-0.5 tracking-wider text-grey-brand font-semibold">Premium</span>
  </div>
);

const CourseCard = ({ course }: Props) => {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-[#4D0B00] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[1/.65] overflow-hidden bg-accent-maroon-dark">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-brand-1 to-accent-maroon-dark" />
        )}
        {course.is_premium && <PremiumBadge />}
        <FavoriteButton courseId={course.id} size="md" variant="overlay" />
        <div className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-red-accent flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-col justify-between flex-grow p-5 sm:p-6">
        <div>
          {course.subtitle && (
            <div className="text-grey-brand/70 text-xs font-sans uppercase tracking-widest mb-2">
              {course.subtitle}
            </div>
          )}
          <h3 className="font-heading font-light text-grey-brand text-xl md:text-2xl !leading-tight mb-3 line-clamp-2">
            {course.title}
          </h3>

          {course.instructors && (
            <div className="flex items-center gap-2 mb-5">
              {course.instructors.avatar_url && (
                <img
                  src={course.instructors.avatar_url}
                  alt={course.instructors.name}
                  className="w-6 h-6 rounded-full object-cover border border-grey-brand/20"
                />
              )}
              <span className="text-grey-brand/70 text-sm font-sans">{course.instructors.name}</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-xs text-grey-brand/70 font-sans">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-300" fill="currentColor" />
              <span>{course.rating > 0 ? course.rating.toFixed(1) : "New"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{course.enrollment_count} students</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(course.duration_minutes)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {course.categories && (
              <span className="px-2.5 pt-2 pb-1.5 text-[11px] leading-none border rounded text-grey-brand border-grey-brand/40 font-sans">
                {course.categories.name}
              </span>
            )}
            <span className="px-2.5 pt-2 pb-1.5 text-[11px] leading-none border rounded text-grey-brand border-grey-brand/40 font-sans capitalize">
              {course.level.replace("_", " ")}
            </span>
            <span className="ml-auto font-semibold text-grey-brand text-sm">
              {course.is_premium && course.price > 0 ? `$${course.price}` : "Free"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
