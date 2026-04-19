import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/seo/Seo";
import { useCourses, useCategories, formatDuration } from "@/hooks/useCourses";
import CourseCard from "@/components/courses/CourseCard";
import { Search, Filter, BookOpen, Loader2, Sparkles } from "lucide-react";

const SURAH_LIST = [
  "Al-Fatihah", "Al-Baqarah", "Aal-Imran", "An-Nisa", "Al-Maidah",
  "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus",
  "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl",
  "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha"
];

type Tab = "pathway" | "subject" | "surah" | "arabic" | "stories";

const TABS: { id: Tab; label: string; description: string }[] = [
  { id: "pathway", label: "My Pathway", description: "Personalized journey based on your level" },
  { id: "subject", label: "Subject", description: "Browse by topic — Tafsir, Tajweed, Hifz" },
  { id: "surah", label: "Surah", description: "Study by chapter of the Quran" },
  { id: "arabic", label: "Arabic", description: "Master classical Arabic of the Quran" },
  { id: "stories", label: "Stories", description: "Prophetic and historical narratives" },
];

const Library = () => {
  const [activeTab, setActiveTab] = useState<Tab>("pathway");
  const [search, setSearch] = useState("");
  const [activeSurah, setActiveSurah] = useState<string | null>(null);
  const { data: courses, isLoading } = useCourses();
  const { data: categories } = useCategories();

  const filtered = useMemo(() => {
    let list = courses ?? [];

    if (activeTab === "subject" && search) {
      list = list.filter((c: any) =>
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
        c.tags?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (activeTab === "arabic") {
      list = list.filter((c: any) =>
        c.categories?.slug?.includes("arabic") ||
        c.tags?.some((t: string) => t.toLowerCase().includes("arabic"))
      );
    }
    if (activeTab === "stories") {
      list = list.filter((c: any) =>
        c.categories?.slug?.includes("stor") ||
        c.tags?.some((t: string) => t.toLowerCase().includes("stor")) ||
        c.title?.toLowerCase().includes("story")
      );
    }
    if (activeTab === "surah" && activeSurah) {
      list = list.filter((c: any) =>
        c.title?.toLowerCase().includes(activeSurah.toLowerCase()) ||
        c.tags?.some((t: string) => t.toLowerCase().includes(activeSurah.toLowerCase()))
      );
    }
    if (activeTab === "pathway") {
      list = [...list].sort((a: any, b: any) => {
        const order = { beginner: 0, intermediate: 1, advanced: 2, all_levels: 3 };
        return (order[a.level as keyof typeof order] ?? 9) - (order[b.level as keyof typeof order] ?? 9);
      });
    }

    return list;
  }, [courses, activeTab, search, activeSurah]);

  return (
    <>
      <Seo
        title="Library | Al Shatibi Academy"
        description="Browse Al Shatibi Academy's full library — by pathway, subject, surah, Arabic, and stories."
        path="/library"
      />

      {/* Hero */}
      <section className="bg-accent-maroon-dark border-b border-grey-brand/10 pt-24 md:pt-28 pb-12">
        <div className="px-6 md:px-8 lg:px-10 xxl:px-24 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-red-accent" />
            <span className="tag-large maroon !mb-0">Library</span>
          </div>
          <h1 className="font-heading font-light text-grey-brand text-4xl md:text-5xl lg:text-6xl !leading-tight mb-4">
            Find your next lesson
          </h1>
          <p className="text-grey-brand/65 font-sans text-lg max-w-2xl">
            Explore the full Al Shatibi catalogue — guided pathways, subject-based study, surah deep-dives, Arabic mastery, and timeless stories.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-accent-maroon-dark border-b border-grey-brand/10 sticky top-[68px] z-30 backdrop-blur-sm">
        <div className="px-6 md:px-8 lg:px-10 xxl:px-24 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-x-8 gap-y-2 -mb-px overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveSurah(null);
                  setSearch("");
                }}
                className={`relative py-5 font-heading text-base md:text-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "text-grey-brand"
                    : "text-grey-brand/50 hover:text-grey-brand/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-accent-maroon-dark min-h-screen pt-10 pb-24">
        <div className="px-6 md:px-8 lg:px-10 xxl:px-24 max-w-7xl mx-auto">
          {/* Tab description */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <p className="text-grey-brand/55 font-sans text-base md:text-lg">
              {TABS.find((t) => t.id === activeTab)?.description}
            </p>

            {(activeTab === "subject" || activeTab === "stories" || activeTab === "arabic") && (
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-brand/40" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#4D0B00] border border-grey-brand/15 text-grey-brand placeholder:text-grey-brand/30 focus:outline-none focus:border-red-accent transition-colors font-sans text-sm"
                />
              </div>
            )}
          </div>

          {/* Surah picker */}
          {activeTab === "surah" && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSurah(null)}
                  className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                    !activeSurah
                      ? "bg-red-accent text-white"
                      : "bg-[#4D0B00] border border-grey-brand/15 text-grey-brand/70 hover:border-red-accent/50"
                  }`}
                >
                  All
                </button>
                {SURAH_LIST.map((surah) => (
                  <button
                    key={surah}
                    onClick={() => setActiveSurah(surah)}
                    className={`px-4 py-2 rounded-full text-sm font-sans transition-all ${
                      activeSurah === surah
                        ? "bg-red-accent text-white"
                        : "bg-[#4D0B00] border border-grey-brand/15 text-grey-brand/70 hover:border-red-accent/50"
                    }`}
                  >
                    {surah}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subject categories chips */}
          {activeTab === "subject" && categories && categories.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    to={`/courses?category=${cat.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-sans bg-[#4D0B00] border border-grey-brand/15 text-grey-brand/70 hover:border-red-accent/50 hover:text-grey-brand transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-[#4D0B00] rounded-2xl p-12 md:p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-accent/15 border border-red-accent/30 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-red-accent" />
              </div>
              <h2 className="font-heading font-light text-2xl md:text-3xl text-grey-brand mb-2">
                Nothing here yet
              </h2>
              <p className="text-grey-brand/60 font-sans max-w-lg mx-auto">
                Try a different tab or check back soon — new lessons land every week.
              </p>
            </div>
          ) : (
            <>
              <div className="text-grey-brand/55 text-sm font-sans mb-5">
                {filtered.length} {filtered.length === 1 ? "course" : "courses"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((course: any) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Library;
