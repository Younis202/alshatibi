import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNewApplicationsCount } from "@/hooks/useNewApplicationsCount";
import {
  LayoutDashboard,
  Inbox,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  Shield,
} from "lucide-react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { count: newCount } = useNewApplicationsCount();

  const items = [
    { to: "/admin", icon: LayoutDashboard, label: "Overview" },
    { to: "/admin/applications", icon: Inbox, label: "Applications", badge: newCount },
    { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const NavItem = ({
    to,
    icon: Icon,
    label,
    badge,
  }: {
    to: string;
    icon: typeof LayoutDashboard;
    label: string;
    badge?: number;
  }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all ${
          active
            ? "bg-red-accent text-white"
            : "text-grey-brand/65 hover:text-grey-brand hover:bg-grey-brand/5"
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="flex-1">{label}</span>
        {badge !== undefined && badge > 0 && (
          <span
            className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center ${
              active ? "bg-white text-red-accent" : "bg-red-accent text-white animate-pulse"
            }`}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-accent-maroon-dark pt-20">
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-24 left-4 z-30 p-2 rounded-lg bg-[#4D0B00] text-grey-brand"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex">
        <aside
          className={`fixed lg:sticky top-20 h-[calc(100vh-5rem)] w-72 bg-[#2a0c08] overflow-y-auto z-20 transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-red-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-grey-brand font-heading text-lg leading-tight">
                  Admin Panel
                </div>
                <div className="text-grey-brand/45 text-[11px] font-sans">
                  Al Shatibi Academy
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1 mb-8">
              {items.map((i) => (
                <NavItem key={i.to} {...i} />
              ))}
            </nav>

            <div className="border-t border-grey-brand/10 pt-4 space-y-1">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans text-grey-brand/65 hover:text-grey-brand hover:bg-grey-brand/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans w-full text-grey-brand/65 hover:text-grey-brand hover:bg-grey-brand/5 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[#4D0B00]">
              <div className="text-grey-brand/45 text-[10px] uppercase tracking-widest font-sans mb-1">
                Signed in as
              </div>
              <div className="text-grey-brand text-sm truncate font-sans">{user?.email}</div>
            </div>
          </div>
        </aside>

        {open && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-10"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
