import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Playfair_Display, Montserrat, Lato } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://borderlesskitchenseries.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Borderless Kitchen",
    template: "%s — Borderless Kitchen",
  },
  description:
    "Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri, with free recipes, ingredient guides, and cooking techniques.",
  openGraph: {
    title: "Borderless Kitchen — Cookbooks Across Cultures",
    description:
      "Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri. Explore Tokyo Meets Tuscany, Seoul Meets Mexico City, and free recipes.",
    url: siteUrl,
    siteName: "Borderless Kitchen",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/banner-carousel-1.png`,
        width: 2172,
        height: 724,
        alt: "Borderless Kitchen — cross-cultural cookbook series",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Borderless Kitchen — Cookbooks Across Cultures",
    description:
      "Explore Tokyo Meets Tuscany and Seoul Meets Mexico City: Japanese–Italian and Korean–Mexican cookbooks by Sebastian Dri.",
    images: [`${siteUrl}/images/banner-carousel-1.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  verification: {
    google: "UjQR4K2FvHN0imPHmH_LkT8SJK_HPz4GiQtipWpy6ks",
    other: { "p:domain_verify": "6c5a7b11b29964be4ac0252a531e8c31" },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Borderless Kitchen",
  url: siteUrl,
  description:
    "A cookbook series exploring cross-cultural cuisine. Each volume pairs two culinary traditions and finds what they share.",

};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Borderless Kitchen",
  url: siteUrl,
  description:
    "A cookbook series exploring cross-cultural cuisine. Each volume pairs two culinary traditions and finds what they share.",
  founder: {
    "@type": "Person",
    name: "Sebastian Dri",
    jobTitle: "Author",
    url: `${siteUrl}/about`,
  },
  knowsAbout: [
    "Italian cuisine",
    "Japanese cuisine",
    "fusion cooking",
    "cross-cultural recipes",
    "cookbook series",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${lato.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0CL174TRRL"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-0CL174TRRL');`}
        </Script>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3">Skip to main content</a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
