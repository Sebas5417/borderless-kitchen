import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };

export default function TwoDinnersCampaignEntry() {
  redirect(
    "/journal/gochujang-shopping-list-for-two-dinners?utm_source=instagram&utm_medium=organic_social&utm_campaign=bk_gochujang_dec2026&utm_content=two-dinners-feed",
  );
}
