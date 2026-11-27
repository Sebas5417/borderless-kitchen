import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };

export default function KoreanPastaCampaignEntry() {
  redirect(
    "/journal/korean-pasta-recipes-gochujang-kimchi-and-doenjang?utm_source=instagram&utm_medium=organic_social&utm_campaign=bk_korean_pasta_dec2026&utm_content=three-sauces-feed",
  );
}
