export const PDF_COOKBOOKS = [
  {
    "id": "korean-home-cooking",
    "title": "Korean Home Cooking: 20 Essential Dishes",
    "price": "$7.99",
    "pages": 45,
    "summary": "A 45-page PDF cookbook with 20 recipes, pantry guidance, techniques, and meal-building notes.",
    "cover": "/images/short-korean-home-cooking.png",
    "href": "https://facelesschannel.gumroad.com/l/korean-home-cooking-cookbook"
  },
  {
    "id": "korean-mexican-fusion",
    "title": "Korean-Mexican Fusion: 20 Weeknight Recipes",
    "price": "$6.99",
    "pages": 39,
    "summary": "A 39-page PDF with 20 Korean-Mexican recipes, pantry guidance, and menu-planning notes.",
    "cover": "/images/short-korean-mexican-fusion.png",
    "href": "https://facelesschannel.gumroad.com/l/korean-mexican-fusion-cookbook"
  },
  {
    "id": "the-japanese-pantry",
    "title": "The Japanese Pantry: 25 Essential Ingredients",
    "price": "$5.99",
    "pages": 36,
    "summary": "A 36-page PDF reference to 25 Japanese pantry ingredients, their uses, and substitutions.",
    "cover": "/images/short-the-japanese-pantry.png",
    "href": "https://facelesschannel.gumroad.com/l/japanese-pantry-guide"
  },
  {
    "id": "japanese-breakfast",
    "title": "Japanese Breakfast: 20 Morning Recipes",
    "price": "$4.99",
    "pages": 34,
    "summary": "A 34-page PDF with 20 breakfast recipes, preparation notes, and a pantry appendix.",
    "cover": "/images/short-japanese-breakfast.png",
    "href": "https://facelesschannel.gumroad.com/l/japanese-breakfast-cookbook"
  }
] as const;

export function cookbookUrl(href: string, placement: string, id: string) {
  const url = new URL(href);
  url.searchParams.set("utm_source", "borderlesskitchenseries");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "short-cookbooks-20261030");
  url.searchParams.set("utm_content", `${placement}-${id}`);
  return url.toString();
}
