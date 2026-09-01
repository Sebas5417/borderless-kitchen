import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  /**
   * Archived-story redirects.
   *
   * Commit 1e186d8 archived 976 stories (80% of the journal). Google had already
   * indexed three of them and has been serving 404s for those URLs since mid-July
   * 2026 (Search Console: "Not found (404)", first detected 2026-07-25). The
   * archive decision stands — these are not restored — so each dead URL is sent to
   * the closest surviving article instead of dropping the traffic on the floor.
   *
   * Only URLs Google actually knows about are listed; the other 973 archived
   * stories were never indexed and need no redirect.
   */
  async redirects() {
    return [
      {
        // Mediterranean vs. Japanese salt essay → the Italian/Japanese base-building guide.
        source: "/journal/the-salt-of-two-seas",
        destination: "/journal/brodo-stock-and-dashi-three-ways-to-build-a-base",
        permanent: true,
      },
      {
        // The no-cream argument is an emulsion argument.
        source: "/journal/no-cream-carbonara-why-italians-are-right",
        destination: "/journal/pasta-water-starch-emulsion-and-mantecatura",
        permanent: true,
      },
      {
        // Closest surviving Southeast Asian noodle-soup guide.
        source: "/journal/cao-lau-hoi-an-vietnam-noodles-guide-recipe",
        destination: "/journal/khao-soi-northern-thai-curry-noodle-soup-guide",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
