import { redirect } from "next/navigation";

export const metadata = { robots: { index: false, follow: true } };

export default function KnifeFitCampaignEntry() {
  redirect(
    "/journal/chef-knife-board-fit-checklist?utm_source=instagram&utm_medium=organic_social&utm_campaign=bk_knife_fit_dec2026&utm_content=knife-fit-feed",
  );
}
