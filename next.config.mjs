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
      /**
       * Duplicate free recipes consolidated 2026-09-06. Fifteen dishes were
       * published two or three times under the same title at 250-600 words each
       * (3x doenjang jjigae, 3x tamagoyaki, 2x chawanmushi, ...). The longest
       * version is kept; the rest are archived to content/_archive/free-recipes
       * and redirected here so no link or ranking signal is dropped.
       */
      {
        source: "/recipes/korean-kimchi-bokkeumbap",
        destination: "/recipes/kimchi-fried-rice-korean-bokkeumbap",
        permanent: true,
      },
      {
        source: "/recipes/chawanmushi-japanese-steamed-egg",
        destination: "/recipes/japanese-chawanmushi-egg-custard",
        permanent: true,
      },
      {
        source: "/recipes/korean-doenjang-jjigae-recipe",
        destination: "/recipes/korean-doenjang-jjigae-classic",
        permanent: true,
      },
      {
        source: "/recipes/korean-doenjang-jjigae-soybean-paste-stew",
        destination: "/recipes/korean-doenjang-jjigae-classic",
        permanent: true,
      },
      {
        source: "/recipes/gamja-jorim-korean-braised-potatoes",
        destination: "/recipes/korean-gamja-jorim-braised-potato",
        permanent: true,
      },
      {
        source: "/recipes/japanese-gyoza-pan-fried-dumplings",
        destination: "/recipes/japanese-gyoza-recipe",
        permanent: true,
      },
      {
        source: "/recipes/korean-japchae-glass-noodles",
        destination: "/recipes/korean-japchae-recipe",
        permanent: true,
      },
      {
        source: "/recipes/korean-kimchi-jjigae-kimchi-stew",
        destination: "/recipes/korean-kimchi-jjigae-old-kimchi",
        permanent: true,
      },
      {
        source: "/recipes/sundubu-jjigae-soft-tofu-stew",
        destination: "/recipes/korean-sundubu-jjigae-quick",
        permanent: true,
      },
      {
        source: "/recipes/japanese-karaage-fried-chicken",
        destination: "/recipes/japanese-karaage-fried-chicken-recipe",
        permanent: true,
      },
      {
        source: "/recipes/japanese-chazuke-tea-rice",
        destination: "/recipes/japanese-ochazuke-green-tea-rice",
        permanent: true,
      },
      {
        source: "/recipes/korean-pajeon-recipe",
        destination: "/recipes/korean-pajeon-scallion-pancake-recipe",
        permanent: true,
      },
      {
        source: "/recipes/zaru-soba-cold-with-tsuyu",
        destination: "/recipes/japanese-zaru-soba-recipe",
        permanent: true,
      },
      {
        source: "/recipes/japanese-tamagoyaki-rolled-omelette",
        destination: "/recipes/japanese-tamagoyaki-rolled-egg-bento",
        permanent: true,
      },
      {
        source: "/recipes/tamagoyaki-japanese-rolled-egg",
        destination: "/recipes/japanese-tamagoyaki-rolled-egg-bento",
        permanent: true,
      },
      {
        source: "/recipes/tteokbokki-spicy-rice-cakes",
        destination: "/recipes/korean-tteokbokki-classic-recipe",
        permanent: true,
      },
      {
        source: "/recipes/yakitori-chicken-skewers",
        destination: "/recipes/japanese-yakitori-skewers-salt",
        permanent: true,
      },
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
