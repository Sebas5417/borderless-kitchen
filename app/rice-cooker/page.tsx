import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };

export default function RiceCookerCampaignEntry() {
  redirect(
    "/journal/best-japanese-rice-cooker-for-home-cooks?utm_source=instagram&utm_medium=organic_social&utm_campaign=bk_rice_cooker_dec2026&utm_content=usual-batch-feed",
  );
}
