import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, BookOpen, GraduationCap, MessageSquare, TrendingUp, PlayCircle } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    profiles: 0,
    courses: 0,
    publishedCourses: 0,
    instructors: 0,
    enrollments: 0,
    reviews: 0,
    lessons: 0,
  });

  useEffect(() => {
    Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "user"),
      supabase.from("courses").select("id", { count: "exact", head: true }),
      supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("instructors").select("id", { count: "exact", head: true }),
      supabase.from("enrollments").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("lessons").select("id", { count: "exact", head: true }),
    ]).then(([p, s, c, pc, i, e, r, l]) => {
      setStats({
        profiles: p.count ?? 0,
        students: s.count ?? 0,
        courses: c.count ?? 0,
        publishedCourses: pc.count ?? 0,
        instructors: i.count ?? 0,
        enrollments: e.count ?? 0,
        reviews: r.count ?? 0,
        lessons: l.count ?? 0,
      });
    });
  }, []);

  const cards = [
    { icon: Users, label: "Total Students", value: stats.profiles.toString(), sub: `${stats.students} active` },
    { icon: BookOpen, label: "Courses", value: stats.courses.toString(), sub: `${stats.publishedCourses} published` },
    { icon: PlayCircle, label: "Lessons", value: stats.lessons.toString(), sub: "Across all courses" },
    { icon: GraduationCap, label: "Instructors", value: stats.instructors.toString(), sub: "Scholars on platform" },
    { icon: TrendingUp, label: "Enrollments", value: stats.enrollments.toString(), sub: "Total registrations" },
    { icon: MessageSquare, label: "Reviews", value: stats.reviews.toString(), sub: "Student feedback" },
  ];

  return (
    <>
      <Seo title="Admin Dashboard | Al Shatibi Academy" description="Admin overview" path="/admin" />
      <AdminLayout>
        <div className="mb-10">
          <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight mb-3">
            Admin <span className="text-red-accent">Overview</span>
          </h1>
          <p className="text-grey-brand/65 font-sans text-base lg:text-lg">
            Real-time pulse of your academy — students, courses, enrollments, and engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mb-12">
          {cards.map((c) => (
            <div
              key={c.label}
              className="bg-[#4D0B00] rounded-2xl p-6 hover:bg-[#5a0d00] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-red-accent" />
              </div>
              <div className="font-heading font-light text-4xl text-grey-brand mb-1">{c.value}</div>
              <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans">
                {c.label}
              </div>
              <div className="text-grey-brand/40 text-xs mt-2 font-sans">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#4D0B00] rounded-2xl p-8">
            <h3 className="font-heading font-light text-grey-brand text-2xl mb-3">
              Manage your library
            </h3>
            <p className="text-grey-brand/70 font-sans text-sm mb-5 leading-relaxed">
              Add new courses, organize lessons, assign instructors, and publish content to your students.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Courses", "Lessons", "Categories", "Instructors", "Featured"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 pt-2 pb-1.5 text-xs leading-none border rounded text-grey-brand border-grey-brand/30 font-sans"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#4D0B00] rounded-2xl p-8">
            <h3 className="font-heading font-light text-grey-brand text-2xl mb-3">
              Engage with students
            </h3>
            <p className="text-grey-brand/70 font-sans text-sm mb-5 leading-relaxed">
              Review feedback, manage testimonials, and grow your community of Quran learners.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Reviews", "Testimonials", "Q&A", "Certificates", "Analytics"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 pt-2 pb-1.5 text-xs leading-none border rounded text-grey-brand border-grey-brand/30 font-sans"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
