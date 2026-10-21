import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Free Cooking Gift Brief",
  robots: { index: false, follow: true },
};

export default function GiftBriefEntry() {
  redirect("https://everyday-kitchen-planner.zestylark13.chatgpt.site/home-cook-gift-checklist?utm_source=instagram&utm_medium=organic_social&utm_campaign=kitchen_gifts_oct2026&utm_content=cook-gift");
}
