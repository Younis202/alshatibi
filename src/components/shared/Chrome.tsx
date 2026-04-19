import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const HIDE_CHROME_PREFIXES = ["/auth", "/reset-password", "/dashboard", "/profile", "/settings", "/admin"];

const Chrome = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const hide = HIDE_CHROME_PREFIXES.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));

  if (hide) {
    // Dashboard / admin / auth handle their own layout; only render Header for nav (no footer)
    const showHeader = !["/auth", "/reset-password"].some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));
    return (
      <>
        {showHeader && <Header />}
        {children}
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Chrome;
