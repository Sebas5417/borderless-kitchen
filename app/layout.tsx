import type { Metadata } from "next";
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
    "A cookbook series by Sebastian Dri on cross-cultural cooking. Vol. I: Tokyo Meets Tuscany — Italian soul, Japanese precision. Thirty fusion recipes where both traditions belong on the same plate.",
  openGraph: {
    title: "Borderless Kitchen — Italian soul. Japanese precision.",
    description:
      "A cookbook series by Sebastian Dri. Vol. I: Tokyo Meets Tuscany — thirty fusion recipes between Italian and Japanese kitchens.",
    url: siteUrl,
    siteName: "Borderless Kitchen",
    type: "website",
  },
  robots: { index: true, follow: true },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
