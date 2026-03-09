interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}

const ArticleSchema = ({
  title,
  description,
  url,
  imageUrl = "https://alshatibi.vercel.app/og-image.png",
  datePublished,
  dateModified,
  authorName = "Al Shatibi Academy"
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": imageUrl,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://alshatibi.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Al Shatibi Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alshatibi.vercel.app/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ArticleSchema;
