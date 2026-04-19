import { useState, useMemo } from "react";
import Seo from "@/components/seo/Seo";
import { useCourses, useCategories } from "@/hooks/useCourses";
import CourseCard from "@/components/courses/CourseCard";
import { AnimateOnScroll } from "@/hooks/useScrollAnimation";
import { Search, Loader2 } from "lucide-react";

const LEVELS = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");

  const { data: courses, isLoading } = useCourses();
  const { data: categories } = useCategories();

  const filtered = useMemo(() => {
    if (!courses) return [];
    return courses.filter((c: any) => {
      if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && c.categories?.slug !== category) return false;
      if (level !== "all" && c.level !== level) return false;
      return true;
    });
  }, [courses, search, category, level]);

  return (
    <>
      <Seo
        title="Course Library | Al Shatibi Academy"
        description="Browse the complete library of Quran, Tafseer, Arabic, and Tajweed courses on Al Shatibi Academy."
        path="/courses"
      />

      <div className="min-h-screen bg-accent-maroon-dark">
        {/* Hero */}
        <div
          className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(30,21,25,0.55) 0%, rgba(30,21,25,0.95) 80%, #1E1519 100%), url(https://www.bayyinahtv.com/_nuxt/sliderbg.BCi6Xknq.png)",
          }}
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10 text-center">
            <AnimateOnScroll>
              <div className="tag-large maroon white">The Course Library</div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h1 className="text-grey-brand mb-6 font-light has-6-xl-font-size font-heading lg:mb-8 home-page">
                Find Your Next Journey
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <p className="text-white/80 font-sans text-base lg:text-lg xl:text-xl max-w-[680px] mx-auto">
                From your very first Arabic letter to the deepest tafseer of the Quran — every
                course is taught by world-class scholars who care.
              </p>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10 -mt-10 relative z-10">
          <AnimateOnScroll>
            <div className="bg-[#4D0B00] rounded-2xl p-5 md:p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-brand/50" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses..."
                    className="w-full bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg h-12 pl-11 pr-4 text-grey-brand font-sans placeholder:text-grey-brand/40 focus:border-red-accent/60 focus:outline-none"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-3 bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg h-12 px-4 text-grey-brand font-sans focus:border-red-accent/60 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories?.map((c: any) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="md:col-span-3 bg-accent-maroon-dark/60 border border-grey-brand/15 rounded-lg h-12 px-4 text-grey-brand font-sans focus:border-red-accent/60 focus:outline-none"
                >
                  {LEVELS.map((l) => (
                    <option key={l.value} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Results */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-10 pt-12 pb-20 lg:pb-28">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-[#4D0B00]/40 rounded-2xl">
              <p className="text-grey-brand/70 font-heading text-2xl mb-2">No courses match your filters</p>
              <p className="text-grey-brand/50 font-sans">Try changing the search or filters above.</p>
            </div>
          ) : (
            <>
              <div className="text-grey-brand/60 text-sm font-sans mb-6">
                Showing <span className="text-grey-brand font-semibold">{filtered.length}</span> course
                {filtered.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-7">
                {filtered.map((c: any, i: number) => (
                  <AnimateOnScroll key={c.id} delay={Math.min(i * 0.05, 0.4)}>
                    <CourseCard course={c} />
                  </AnimateOnScroll>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
