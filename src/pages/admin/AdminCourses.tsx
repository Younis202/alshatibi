import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Edit3, Trash2, Eye, EyeOff, Loader2, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminCourses = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*, categories(name), instructors(name)")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const filtered = (courses ?? []).filter(
    (c: any) => !search || c.title.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("courses")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update.");
      return;
    }
    toast.success(`Course ${newStatus === "published" ? "published" : "unpublished"}.`);
    qc.invalidateQueries({ queryKey: ["admin-courses"] });
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  const deleteCourse = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This will also remove all lessons and enrollments.`)) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete.");
      return;
    }
    toast.success("Course deleted.");
    qc.invalidateQueries({ queryKey: ["admin-courses"] });
    qc.invalidateQueries({ queryKey: ["courses"] });
  };

  return (
    <>
      <Seo title="Manage Courses | Admin" description="Course management" path="/admin/courses" />
      <AdminLayout>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-light text-grey-brand text-3xl sm:text-4xl !leading-tight mb-2">
              Courses
            </h1>
            <p className="text-grey-brand/60 font-sans">Manage all courses, lessons, and content.</p>
          </div>
          <Link to="/admin/courses/new" className="primary-btn maroon no-margin text-grey-brand inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> <span>New Course</span>
          </Link>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-brand/45" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full bg-[#4D0B00] rounded-lg h-11 pl-11 pr-4 text-grey-brand font-sans placeholder:text-grey-brand/40 focus:outline-none focus:ring-2 focus:ring-red-accent/40"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-red-accent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#4D0B00] rounded-2xl p-12 text-center">
            <BookOpen className="w-12 h-12 text-grey-brand/25 mx-auto mb-3" />
            <p className="text-grey-brand/55 font-sans">No courses yet.</p>
          </div>
        ) : (
          <div className="bg-[#4D0B00] rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/20 text-grey-brand/55 text-xs uppercase tracking-wider font-sans">
                  <tr>
                    <th className="text-left px-5 py-3">Course</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Category</th>
                    <th className="text-left px-5 py-3 hidden lg:table-cell">Instructor</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-left px-5 py-3 hidden md:table-cell">Enrolled</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-grey-brand/10">
                  {filtered.map((c: any) => (
                    <tr key={c.id} className="hover:bg-black/15">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {c.thumbnail_url && (
                            <img
                              src={c.thumbnail_url}
                              alt=""
                              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="text-grey-brand font-sans font-semibold truncate">
                              {c.title}
                            </div>
                            <div className="text-grey-brand/45 text-xs font-sans truncate">
                              {c.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-grey-brand/70 font-sans text-sm">
                        {c.categories?.name ?? "—"}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-grey-brand/70 font-sans text-sm">
                        {c.instructors?.name ?? "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-sans ${
                            c.status === "published"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-grey-brand/5 text-grey-brand/55 border border-grey-brand/10"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-grey-brand/70 font-sans text-sm">
                        {c.enrollment_count}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => togglePublish(c.id, c.status)}
                            title={c.status === "published" ? "Unpublish" : "Publish"}
                            className="p-2 rounded-md text-grey-brand/60 hover:text-red-accent hover:bg-grey-brand/5"
                          >
                            {c.status === "published" ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <Link
                            to={`/admin/courses/${c.id}/edit`}
                            title="Edit"
                            className="p-2 rounded-md text-grey-brand/60 hover:text-red-accent hover:bg-grey-brand/5"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteCourse(c.id, c.title)}
                            title="Delete"
                            className="p-2 rounded-md text-grey-brand/60 hover:text-red-accent hover:bg-grey-brand/5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminCourses;
