import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  /** Path starting with "/" (used to build canonical URL). */
  path?: string;
  /** Comma-separated keywords string (optional). */
  keywords?: string;
  /** OpenGraph image absolute URL (optional). */
  image?: string;
  /** lang attribute hint for the page (optional). */
  lang?: string;
};

const SITE_NAME = "Al Shatibi TV";
const BASE_URL = "https://alshatibi.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export default function Seo({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_IMAGE,
  lang,
}: SeoProps) {
  const canonical = `${BASE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={canonical} />

      {/* Optional language hint */}
      {lang ? <html lang={lang} /> : null}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
