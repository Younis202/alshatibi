import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const BayyinahLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-9 xs:h-10 sm:h-12 block"
    viewBox="0 0 706 212"
    preserveAspectRatio="xMidYMid meet"
  >
    <g fill="#ffffff">
      <path d="M310.8 204.3 c-4.9 -3 -8.8 -6.2 -8.8 -7 0 -2 10.7 -18 12.4 -18.6 2.9 -1.2 19.6 10.3 19.6 13.4 0 1.1 -1.7 4.3 -3.8 7.2 -2.1 2.9 -4.5 6.4 -5.5 8 -1 1.5 -2.5 2.7 -3.5 2.7 -0.9 0 -5.6 -2.6 -10.4 -5.7z" />
      <path d="M213.8 201.5 c-4.7 -3.1 -8.8 -6.2 -9.1 -6.9 -0.8 -2.1 10.9 -19.6 13.2 -19.6 0.4 0 4.9 2.7 10.1 6 5.2 3.3 10 6 10.5 5.9 0.6 0 3.3 -3.2 6 -7.2 2.8 -3.9 5.8 -7.3 6.7 -7.5 2.7 -0.5 18.8 10.5 18.8 12.7 0 3 -10.3 17.5 -12.7 17.9 -1 0.2 -5.9 -2.2 -10.8 -5.3 -4.8 -3 -9.4 -5.5 -10 -5.5 -0.7 0 -3.6 3.4 -6.4 7.5 -2.9 4.1 -5.8 7.5 -6.4 7.5 -0.7 0 -5.1 -2.5 -9.9 -5.5z" />
      <path d="M32 201.7 c-14.6 -3.5 -22.7 -10.7 -27.6 -24.5 -5.8 -16.4 -1.1 -41.5 12.1 -64.7 5 -8.8 6.8 -10.9 8.4 -10.4 0.7 0.3 0 2.8 -1.8 6.6 -9.5 20.1 -13.1 38.5 -9.9 51.1 1.6 6.4 8.4 13.2 16.4 16.2 5.1 1.9 7.7 2.2 18.9 2.2 26 -0.1 50.9 -6.6 142.5 -37.2 32.7 -10.9 64.9 -21.2 71.5 -22.9 18.4 -4.5 33.4 -7.3 39.8 -7.5 5.3 -0.1 6.1 0.2 8.3 2.7 3.1 3.7 3.1 8.5 -0.2 16.2 -4 9.3 -4.6 12.6 -2.8 15.4 1.4 2 2.2 2.3 5.7 1.8 5.1 -0.7 13.8 -6.7 19.3 -13.4 4.7 -5.8 6.9 -13.9 6.2 -22.9 -0.6 -7.6 -3.2 -9.9 -10 -9 -2.5 0.4 -4.9 0.3 -5.2 -0.2 -0.5 -0.9 10.5 -12.1 15.8 -16 4 -3.1 8.4 -2.9 9.6 0.3 0.6 1.6 0.7 11 0.3 23.8 -0.7 23.9 -0.3 27.3 3.4 31.7 4.8 5.8 9.6 7.5 20.8 7.4 17.5 0 40.4 -6.1 62 -16.4 13.5 -6.4 18.5 -10.2 18.5 -13.9 0 -6.8 -8.6 -12.1 -19.4 -12.1 -10.6 0 -24.5 6.3 -36.7 16.7 -22.2 18.8 -24.1 20.3 -26.4 20.3 -3.1 0 -3.1 0 0.1 -9.1 5.7 -16.7 6.6 -30.5 3.9 -61.4 -1.6 -17.2 -4 -39.9 -5.1 -46.7 -0.5 -3.6 -0.4 -3.7 7.8 -9.8 4.6 -3.5 10.2 -8.1 12.5 -10.3 2.4 -2.3 4.4 -3.9 4.5 -3.6 0.2 0.2 0 20.4 -0.3 44.9 -0.5 41.5 -0.7 45 -2.7 52.2 -1.2 4.2 -2.6 8.8 -3.2 10.3 -2.3 6 -0.1 4.7 11.4 -6.9 17.1 -17 30.1 -24.4 44.6 -25.3 17.6 -1.2 27 6.4 27 21.7 0 22.5 -18.6 45.2 -51 62.3 -20.5 10.8 -40.6 16.2 -57.5 15.5 -8.7 -0.4 -10.8 -0.8 -15.3 -3.3 -6.5 -3.5 -10.2 -10.2 -11 -20 -0.3 -3.9 -0.9 -6.5 -1.6 -6.4 -0.6 0 -3.5 2.8 -6.5 6.2 -7.9 8.9 -17.5 17.2 -23.4 20.2 -6.6 3.3 -13.8 3.4 -16.6 0.4 -4.4 -4.7 -3.7 -10.4 2.9 -24.1 4.6 -9.5 4.8 -11.2 1.6 -13.3 -5.6 -3.7 -26.3 2.1 -98.1 27.5 -79.7 28.1 -115.7 37.8 -144 38.6 -9.4 0.2 -15.8 -0.1 -19.5 -0.9z" />
      <path d="M669.1 192.3 c17 -17.8 19.5 -28.6 14.9 -64.3 -5.8 -45.1 -8.1 -65.2 -9.2 -81.4 l-1.2 -17.9 4.9 -4.1 c2.8 -2.3 8.3 -7.2 12.2 -11 4 -3.8 7.5 -6.7 7.7 -6.5 0.3 0.3 0.1 5.9 -0.4 12.4 -1.1 13.8 -0.1 33 3.5 72.5 4.6 48.9 2.9 63.8 -8.9 81.9 -5.1 7.7 -11.9 14.5 -19.6 19.5 -7.7 5.1 -9.3 4.6 -3.9 -1.1z" />
      <path d="M497.5 185.5 c-5.2 -1.8 -8.8 -5.9 -11.4 -12.9 -3.4 -9.1 -4 -16.3 -4.3 -54 l-0.3 -36 8.2 -2.2 c4.5 -1.2 9.5 -2.5 11.2 -2.9 l3.1 -0.7 0 11.9 c0 6.5 -0.7 17.9 -1.5 25.3 -2.2 19.4 -2.3 33.7 -0.2 37.7 3.6 6.8 9.5 8 18.7 3.7 4.1 -1.8 8.3 -5.4 16.2 -13.6 5.9 -6 11.3 -10.8 12 -10.6 0.8 0.3 1.3 3 1.4 8.4 0.2 13.1 3.7 17.1 11.9 13.5 4.5 -2 8.7 -6.7 15.8 -17.7 2.5 -4 5 -7.5 5.6 -7.8 0.6 -0.4 1.2 0.9 1.6 3.1 2.1 13.8 7.1 18.8 15.1 15 4.1 -2 6.6 -6.7 8.9 -16.7 1 -4.1 2 -8.8 2.4 -10.5 1.1 -4.7 2.4 -3.6 3.8 3.2 1.7 8.7 4.8 15.4 8.9 19.4 3 2.9 4.1 3.3 8.9 3.3 4.4 0.1 5.9 -0.3 7.7 -2.2 2.1 -2.1 2.3 -3.1 2.3 -14 0 -10.7 -2.1 -37.3 -4.5 -56.2 -1.5 -12 -3.1 -42 -2.3 -43.5 0.5 -0.7 4.4 -3.9 8.8 -7 4.4 -3.1 9.4 -7 11 -8.6 4.3 -4 5.5 -3.8 4.7 0.9 -0.8 4 -0.8 37.9 -0.1 81.2 0.3 23.7 0.2 28.6 -1.4 35.5 -7.1 32.2 -22.9 48.4 -39.4 40.4 -3.2 -1.6 -5.2 -3.5 -7.6 -7.6 -1.7 -3.1 -3.7 -5.6 -4.2 -5.6 -0.6 0 -2.5 2.7 -4.3 5.9 -8.5 15.4 -19.1 16.5 -25.7 2.7 -1.6 -3.5 -3.3 -6.3 -3.8 -6.3 -0.4 0 -2.2 2.1 -4 4.7 -10.4 14.9 -16 19.3 -22.6 17.7 -4.4 -1.1 -7.6 -5.6 -9.1 -13 -0.6 -3 -1.6 -5.4 -2.1 -5.4 -0.5 0 -4.6 3.8 -9.2 8.4 -12 12.1 -21.5 16.3 -30.2 13.1z" />
      <path d="M549 93.9 c-4.3 -2.9 -7.6 -5.9 -7.8 -7 -0.4 -2.1 9.1 -16.5 11.8 -17.9 1.3 -0.7 3.3 0 7.6 2.6 7.7 4.6 12.4 8.2 12.4 9.5 0 0.6 -2.6 4.8 -5.7 9.4 -7 10.2 -7.8 10.4 -18.3 3.4z" />
      <path d="M584.9 90.6 c-4.6 -2.9 -8.5 -6.1 -8.7 -7 -0.4 -2.1 11.5 -18.6 13.5 -18.6 0.8 0 5.3 2.5 9.9 5.5 5.7 3.8 8.4 6.2 8.4 7.5 0 2.7 -11.1 18 -13 18 -0.9 0 -5.4 -2.4 -10.1 -5.4z" />
      <path d="M566 67.4 c-8.6 -5.3 -11 -7.2 -11 -8.8 0 -0.7 2.7 -4.9 6 -9.4 4.1 -5.6 6.7 -8.2 8.1 -8.2 1.9 0 16.7 9.3 18.1 11.4 0.4 0.6 -0.3 2.7 -1.4 4.8 -2.6 4.6 -10.6 14.8 -11.6 14.8 -0.4 0 -4.1 -2.1 -8.2 -4.6z" />
      <path d="M505 51.1 c0 -4.3 3.6 -6.1 40 -20 20.1 -7.7 40.7 -15.5 45.9 -17.5 5.2 -2 9.6 -3.4 9.9 -3.1 0.3 0.3 -0.2 2 -1 3.8 -1.5 3.1 -2.9 3.8 -17 9.2 -36.7 13.9 -57 21.6 -66.6 25.4 -5.7 2.3 -10.5 4.1 -10.8 4.1 -0.2 0 -0.4 -0.9 -0.4 -1.9z" />
    </g>
  </svg>
);

const ArrowSVG = () => (
  <svg
    className="flex-shrink-0 w-2.5 lg:w-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 13 14"
  >
    <path
      fill="#fff"
      d="M11.813.75c.519 0 .937.418.937.938v9.374c0 .52-.418.938-.938.938a.935.935 0 0 1-.937-.938V3.95l-9.023 9.028a.937.937 0 0 1-1.324-1.324L9.55 2.628l-7.114-.004a.935.935 0 0 1-.937-.938c0-.519.418-.937.938-.937h9.374Z"
    ></path>
  </svg>
);

const ChevronDownSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 20"
    className="w-4 h-4 ml-1 transition-transform duration-300"
  >
    <path
      fill="currentColor"
      d="M10.217 14.736a.878.878 0 0 0 1.256 0l7.115-7.197a.903.903 0 0 0 0-1.271.881.881 0 0 0-1.256 0l-6.482 6.56-6.485-6.564a.878.878 0 0 0-1.256 0 .907.907 0 0 0 0 1.271l7.108 7.2Z"
    ></path>
  </svg>
);

const ChevronRightSVG = () => (
  <svg
    className="w-4 xl:w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#fff"
      d="M14.736 9.368a.878.878 0 0 1 0 1.255L7.539 17.74a.904.904 0 0 1-1.271 0 .881.881 0 0 1 0-1.256l6.56-6.482-6.564-6.486a.878.878 0 0 1 0-1.255.907.907 0 0 1 1.271 0l7.2 7.108Z"
    ></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    fill="none"
    viewBox="0 0 18 16"
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 md:w-4"
  >
    <path
      d="M17.7109 8.67801C17.8945 8.50223 18 8.25614 18 7.99833C18 7.74051 17.8945 7.49833 17.7109 7.31864L10.8359 0.75614C10.4609 0.396765 9.86719 0.41239 9.51172 0.78739C9.15625 1.16239 9.16797 1.75614 9.54297 2.11161L14.7227 7.06083H1.4375C0.917969 7.06083 0.5 7.4788 0.5 7.99833C0.5 8.51786 0.917969 8.93583 1.4375 8.93583H14.7227L9.53906 13.8811C9.16406 14.2405 9.15234 14.8304 9.50781 15.2054C9.86328 15.5804 10.457 15.5921 10.832 15.2366L17.707 8.67411L17.7109 8.67801Z"
      fill="currentColor"
    ></path>
  </svg>
);

interface BrowseItem {
  label: string;
  href: string;
  description: string;
}

interface BrowseCategory {
  label: string;
  children: BrowseItem[];
}

const browseCategories: BrowseCategory[] = [
  {
    label: "Quran",
    children: [
      {
        label: "See All Quran Courses",
        href: "/explore/quran",
        description: "Surah-by-Surah, Subject-by-Subject",
      },
    ],
  },
  {
    label: "Arabic",
    children: [
      {
        label: "See All Arabic Courses",
        href: "/explore/arabic",
        description: "Step-by-Step Arabic Learning",
      },
    ],
  },
  {
    label: "Learn To Read",
    children: [
      {
        label: "See All Arabic Courses",
        href: "/explore/learnToReadQuran",
        description: "Step-by-Step Way To Read Quran",
      },
    ],
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const browseRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (browseRef.current && !browseRef.current.contains(e.target as Node)) {
        setBrowseOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }, [location]);

  return (
    <>
      <div
        className={`flex fixed flex-col h-auto top-0 z-50 max-w-[2100px] w-full flex-none transition-all duration-500 ${
          !scrolled ? "bg-transparent" : "bg-accent-maroon-dark"
        }`}
      >
        <div className="px-6 sm:px-6 md:px-8 lg:px-10 xxl:px-24 py-4 md:py-5 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-x-6 lg:gap-x-10">
              <Link
                to="/"
                className="flex-shrink-0"
                aria-label="Al Shatibi TV Home"
              >
                <BayyinahLogo />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
                {/* Browse Dropdown */}
                <div ref={browseRef} className="relative">
                  <button
                    onClick={() => setBrowseOpen(!browseOpen)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 text-white ${
                      browseOpen ? "bg-[#4D3B38]" : "hover:bg-[#4D3B38]/60"
                    }`}
                  >
                    Browse
                    <ChevronDownSVG />
                  </button>

                  {browseOpen && (
                    <div className="absolute top-full left-0 pt-3 z-50">
                      <div className="flex bg-[#231311] rounded-xl border border-[#533531] overflow-hidden shadow-2xl min-w-[280px]">
                        {/* Categories */}
                        <div className="p-4 lg:p-5 min-w-[220px] xl:min-w-[260px]">
                          {browseCategories.map((cat) => (
                            <div
                              key={cat.label}
                              className="relative"
                              onMouseEnter={() => setActiveCat(cat.label)}
                            >
                              <div className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#452824]">
                                <span className="text-white text-base lg:text-lg">
                                  {cat.label}
                                </span>
                                <ChevronRightSVG />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sub-items panel */}
                        {activeCat && (
                          <div className="bg-[#1a0e0c] border-l border-[#533531] p-4 lg:p-5 min-w-[260px] xl:min-w-[300px]">
                            {browseCategories
                              .find((c) => c.label === activeCat)
                              ?.children.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  onClick={() => setBrowseOpen(false)}
                                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-[#452824] group"
                                >
                                  <div>
                                    <div className="text-white text-base">
                                      {child.label}
                                    </div>
                                    <div className="text-white/50 text-sm mt-0.5">
                                      {child.description}
                                    </div>
                                  </div>
                                  <ArrowSVG />
                                </Link>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/explore"
                  className="px-4 py-2 rounded-lg text-sm lg:text-base font-medium text-white transition-all duration-300 hover:bg-[#4D3B38]/60"
                >
                  Explore
                </Link>

                <a
                  href="/?scrollTo=pricing"
                  className="px-4 py-2 rounded-lg text-sm lg:text-base font-medium text-white transition-all duration-300 hover:bg-[#4D3B38]/60"
                >
                  Pricing
                </a>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-x-3 lg:gap-x-4">
              {/* Search Icon */}
              <button
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300 hover:bg-[#4D3B38]/60"
                aria-label="Search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.96875 17.1875C13.9556 17.1875 17.1875 13.9556 17.1875 9.96875C17.1875 5.98194 13.9556 2.75 9.96875 2.75C5.98194 2.75 2.75 5.98194 2.75 9.96875C2.75 13.9556 5.98194 17.1875 9.96875 17.1875Z"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.073 15.0735L19.2496 19.2501"
                    stroke="#9ca3af"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Sign In */}
              <Link
                to="/contact"
                className="hidden lg:flex h-10 text-sm xl:text-base min-w-fit cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0 items-center justify-center font-semibold text-white border-2 border-red-accent rounded-lg py-4 px-4 xl:px-5 hover:bg-btn-gradient hover:border-red-accent"
              >
                <span className="flex items-center font-sans flex-shrink-0">
                  Sign In to Al Shatibi TV
                </span>
              </Link>

              {/* Start Learning CTA */}
              <Link
                to="/contact"
                className="hidden sm:flex h-10 px-4 xl:px-6 text-sm xl:text-base min-w-fit cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0 items-center justify-center font-semibold text-white bg-btn-gradient border border-red-accent rounded-lg hover:opacity-90"
              >
                <span className="flex items-center font-sans flex-shrink-0 gap-2">
                  Start Learning
                  <ArrowRightIcon />
                </span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-accent-maroon-dark pt-[72px] overflow-y-auto md:hidden">
          <nav className="px-6 py-8 flex flex-col gap-2">
            {browseCategories.map((cat) => (
              <div key={cat.label}>
                <button
                  onClick={() =>
                    setMobileSubmenu(
                      mobileSubmenu === cat.label ? null : cat.label
                    )
                  }
                  className="flex items-center justify-between w-full text-lg text-white py-3 px-4 rounded-lg hover:bg-[#4D3B38]/60 transition-colors"
                >
                  {cat.label}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      mobileSubmenu === cat.label ? "rotate-90" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M14.736 9.368a.878.878 0 0 1 0 1.255L7.539 17.74a.904.904 0 0 1-1.271 0 .881.881 0 0 1 0-1.256l6.56-6.482-6.564-6.486a.878.878 0 0 1 0-1.255.907.907 0 0 1 1.271 0l7.2 7.108Z"
                    />
                  </svg>
                </button>
                {mobileSubmenu === cat.label && (
                  <div className="pl-4 pb-2">
                    {cat.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block text-white/80 py-2.5 px-4 text-base rounded-lg hover:bg-[#4D3B38]/40 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/explore"
              className="text-lg text-white py-3 px-4 rounded-lg hover:bg-[#4D3B38]/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>

            <a
              href="/?scrollTo=pricing"
              className="text-lg text-white py-3 px-4 rounded-lg hover:bg-[#4D3B38]/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>

            <div className="mt-6 flex flex-col gap-3 px-4">
              <Link
                to="/contact"
                className="h-12 text-base cursor-pointer transition-all duration-300 flex items-center justify-center font-semibold text-white border-2 border-red-accent rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In to Al Shatibi TV
              </Link>
              <Link
                to="/contact"
                className="h-12 text-base cursor-pointer transition-all duration-300 flex items-center justify-center font-semibold text-white bg-btn-gradient border border-red-accent rounded-lg gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Learning
                <ArrowRightIcon />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
