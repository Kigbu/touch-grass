"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  description?: string;
  children: React.JSX.Element | React.JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => {
  const pathName = usePathname();

  return (
    <HelmetProvider>
      <div className="w-full ">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/png" href={`/favicon.png`} />

          <meta
            name="keywords"
            content="Touch Grass"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="author" content="Kigbu Amekalo" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph Metadata */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content="https://www.touchgrass.com/" />
          <meta property="og:type" content="website" />

          {/* Twitter Metadata */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content="/twitter-image.png" />
          <meta name="twitter:site" content="@touchgrass" />

          {/* Canonical URL */}
          <link rel="canonical" href={`https://www.touchgrass.com${pathName}`} />

          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "I-Tech Platform",
              url: "https://www.touchgrass.com/",
              logo: "/images/brand/logo-white.svg",
              description: description,
            })}
          </script>
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  );
};

export default PageContainer;
