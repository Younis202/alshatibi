/**
 * Google Analytics 4 loader.
 *
 * Set your Measurement ID below (looks like: G-XXXXXXXXXX).
 * Get it from https://analytics.google.com → Admin → Data Streams → Web → Measurement ID.
 *
 * The Measurement ID is a PUBLIC value — safe to commit. It is what every site
 * with GA exposes in their HTML. Real protection comes from the GA dashboard's
 * Data filters, not from hiding the ID.
 */
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ← replace with your real GA4 ID

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

export function initAnalytics() {
  if (loaded) return;
  if (typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.startsWith("G-XXXX")) return;

  loaded = true;

  // Inject the gtag.js script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag must use `arguments` for the GA4 snippet to behave correctly.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-rest-params
  window.gtag = function gtag(...args: unknown[]) {
    (window.dataLayer as unknown[]).push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    // We send page_view manually on every SPA route change in ScrollToTop.tsx
    send_page_view: false,
  });
}
