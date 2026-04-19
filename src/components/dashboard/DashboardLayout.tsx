import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Heart,
  Award,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, signOut, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/courses", icon: BookOpen, label: "My Courses" },
    { to: "/dashboard/favorites", icon: Heart, label: "Favorites" },
    { to: "/dashboard/certificates", icon: Award, label: "Certificates" },
  ];

  const accountItems = [
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  const userInitial = (user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase();
  const fullName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student";

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: typeof LayoutDashboard;
    label: string;
  }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans transition-all ${
          active
            ? "bg-red-accent/15 text-grey-brand border-l-2 border-red-accent"
            : "text-grey-brand/65 hover:text-grey-brand hover:bg-grey-brand/5 border-l-2 border-transparent"
        }`}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-accent-maroon-dark pt-20">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-24 left-4 z-30 p-2 rounded-lg bg-[#4D0B00] text-grey-brand"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-20 h-[calc(100vh-5rem)] w-72 bg-[#2a0c08] overflow-y-auto z-20 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            {/* User card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#4D0B00] mb-6">
              <div className="w-11 h-11 rounded-full bg-btn-gradient text-grey-brand font-semibold flex items-center justify-center flex-shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0">
                <div className="text-grey-brand text-sm font-medium truncate font-sans">
                  {fullName}
                </div>
                <div className="text-grey-brand/50 text-xs truncate font-sans">{user?.email}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-grey-brand/45 text-[11px] uppercase tracking-widest font-sans mb-3 px-4">
                Learning
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavItem key={item.to} {...item} />
                ))}
              </nav>
            </div>

            <div className="mb-6">
              <div className="text-grey-brand/45 text-[11px] uppercase tracking-widest font-sans mb-3 px-4">
                Account
              </div>
              <nav className="flex flex-col gap-1">
                {accountItems.map((item) => (
                  <NavItem key={item.to} {...item} />
                ))}
              </nav>
            </div>

            {hasRole("admin") && (
              <div className="mb-6">
                <div className="text-grey-brand/45 text-[11px] uppercase tracking-widest font-sans mb-3 px-4">
                  Administration
                </div>
                <Link
                  to="/admin"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans bg-red-accent/15 border border-red-accent/40 text-red-accent hover:bg-red-accent/25 transition-all"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Link>
              </div>
            )}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-sans w-full text-grey-brand/65 hover:text-grey-brand hover:bg-grey-brand/5 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-10"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10 xl:p-12">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
