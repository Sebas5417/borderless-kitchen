import { redirect } from 'next/navigation';

export const metadata = {
  robots: { index: false, follow: true },
};

export default function MealPrepGiftEntry() {
  redirect(
    'https://everyday-kitchen-planner.zestylark13.chatgpt.site/meal-prep-gifts-for-busy-cooks?utm_source=instagram&utm_medium=organic_social&utm_campaign=kitchen_gifts_oct2026&utm_content=meal-prep-gift',
  );
}
