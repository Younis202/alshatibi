import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Seo from "@/components/seo/Seo";
import AdminLayout from "@/components/admin/AdminLayout";
import { Inbox, UserCheck, Clock, MessageSquare, Star, ArrowRight, Bell } from "lucide-react";

interface ApplicationRow {
  id: string;
  full_name: string;
  email: string;
  country: string;
  goal: string;
  status: string;
  created_at: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: any;
  label: string;
  value: string | number;
  sub: string;
  accent?: boolean;
}) => (
  <div
    className={`bg-[#4D0B00] rounded-2xl p-6 transition-colors ${
      accent ? "ring-2 ring-red-accent/40" : "hover:bg-[#5a0d00]"
    }`}
  >
    <div className="w-10 h-10 rounded-lg bg-red-accent/15 border border-red-accent/30 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-red-accent" />
    </div>
    <div className="font-heading font-light text-4xl text-grey-brand mb-1">{value}</div>
    <div className="text-grey-brand/55 text-[11px] uppercase tracking-widest font-sans">
      {label}
    </div>
    <div className="text-grey-brand/40 text-xs mt-2 font-sans">{sub}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    enrolled: 0,
    testimonials: 0,
  });
  const [recent, setRecent] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [allRes, newRes, contactedRes, enrolledRes, testRes, recentRes] = await Promise.all([
        supabase.from("enrollment_applications").select("id", { count: "exact", head: true }),
        supabase.from("enrollment_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("enrollment_applications").select("id", { count: "exact", head: true }).eq("status", "contacted"),
        supabase.from("enrollment_applications").select("id", { count: "exact", head: true }).eq("status", "enrolled"),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase
          .from("enrollment_applications")
          .select("id, full_name, email, country, goal, status, created_at")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);
      setStats({
        total: allRes.count ?? 0,
        new: newRes.count ?? 0,
        contacted: contactedRes.count ?? 0,
        enrolled: enrolledRes.count ?? 0,
        testimonials: testRes.count ?? 0,
      });
      setRecent((recentRes.data ?? []) as ApplicationRow[]);
      setLoading(false);
    };
    load();
  }, []);

  const statusColor: Record<string, string> = {
    new: "bg-amber-300/15 text-amber-300",
    contacted: "bg-sky-300/15 text-sky-300",
    enrolled: "bg-emerald-300/15 text-emerald-300",
    rejected: "bg-red-accent/15 text-red-accent",
    on_hold: "bg-grey-brand/15 text-grey-brand/70",
  };

  return (
    <>
      <Seo title="Admin Dashboard | Al Shatibi Academy" description="Admin overview" path="/admin" />
      <AdminLayout>
        <div className="mb-10">
          <h1 className="font-heading font-light text-grey-brand text-4xl sm:text-5xl !leading-tight mb-3">
            Admin <span className="text-red-accent">Overview</span>
          </h1>
          <p className="text-grey-brand/65 font-sans text-base lg:text-lg">
            Track new student applications and manage your academy's reputation.
          </p>
        </div>

        {stats.new > 0 && (
          <Link
            to="/admin/applications"
            className="group flex items-center gap-4 mb-8 p-5 rounded-2xl bg-gradient-to-r from-red-accent/20 via-red-accent/10 to-transparent border border-red-accent/30 hover:border-red-accent/60 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-accent flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-heading text-grey-brand text-lg leading-tight">
                You have <span className="text-red-accent font-semibold">{stats.new}</span> new application{stats.new > 1 ? "s" : ""} waiting!
              </div>
              <div className="text-grey-brand/60 text-sm font-sans mt-0.5">
                طلبات طلاب جدد محتاجة تواصل — اضغط هنا للرد عليهم
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-red-accent group-hover:translate-x-1 transition-transform" />
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 mb-12">
          <StatCard icon={Inbox} label="New Applications" value={stats.new} sub="Awaiting first contact" accent={stats.new > 0} />
          <StatCard icon={Clock} label="In Progress" value={stats.contacted} sub="Currently being contacted" />
          <StatCard icon={UserCheck} label="Enrolled" value={stats.enrolled} sub="Students who joined" />
          <StatCard icon={MessageSquare} label="Total Applications" value={stats.total} sub="All time" />
          <StatCard icon={Star} label="Testimonials" value={stats.testimonials} sub="Live on site" />
        </div>

        <div className="bg-[#4D0B00] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-light text-grey-brand text-2xl">Recent Applications</h3>
            <Link
              to="/admin/applications"
              className="text-red-accent text-sm font-sans flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <p className="text-grey-brand/50 font-sans py-8 text-center">Loading…</p>
          ) : recent.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="w-10 h-10 text-grey-brand/30 mx-auto mb-3" />
              <p className="text-grey-brand/60 font-sans">No applications yet — share the site to start receiving inquiries.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="text-grey-brand/55 text-xs uppercase tracking-widest">
                    <th className="text-left px-4 py-2 font-normal">Name</th>
                    <th className="text-left px-4 py-2 font-normal">Country</th>
                    <th className="text-left px-4 py-2 font-normal">Goal</th>
                    <th className="text-left px-4 py-2 font-normal">Status</th>
                    <th className="text-right px-4 py-2 font-normal">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id} className="border-t border-grey-brand/10">
                      <td className="px-4 py-3 text-grey-brand">
                        <div className="font-semibold">{r.full_name}</div>
                        <div className="text-grey-brand/50 text-xs">{r.email}</div>
                      </td>
                      <td className="px-4 py-3 text-grey-brand/80">{r.country}</td>
                      <td className="px-4 py-3 text-grey-brand/80 capitalize">{r.goal}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs uppercase tracking-wider ${statusColor[r.status] ?? "bg-grey-brand/15 text-grey-brand/70"}`}>
                          {r.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-grey-brand/60 text-xs text-right">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 bg-[#4D0B00] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-300/15 border border-emerald-300/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-300" />
            </div>
            <h4 className="font-heading text-grey-brand text-xl">Live Notifications</h4>
          </div>
          <p className="text-grey-brand/70 text-sm font-sans leading-relaxed mb-3">
            لما أي طالب يقدم طلب، هتشوف notification فورية هنا في الـ Admin Panel — حتى لو الـ tab مش مفتوح، هتجيلك browser notification على سطح المكتب.
          </p>
          <p className="text-grey-brand/45 text-xs font-sans">
            ✓ مفعّل الآن — مفيش حاجة محتاجة setup. اضغط "Allow" لما المتصفح يطلب إذن الإشعارات.
          </p>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
