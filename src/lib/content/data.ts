import type { Book, HeatLevel, PantryEntry, Story } from './types'

export const HEAT_LEVELS: HeatLevel[] = [
  { key: 'mild', label: 'Mild', description: 'Soft heat. Background warmth.' },
  { key: 'warm', label: 'Warm', description: 'Present but rounded.' },
  { key: 'bold', label: 'Bold', description: 'Forward, structural heat.' },
  { key: 'fire', label: 'Fire', description: 'The headline note of the dish.' },
]

export const BOOKS: Book[] = [
  {
    slug: 'tokyo-meets-tuscany',
    title: 'Tokyo Meets Tuscany',
    subtitle: 'A first volume.',
    status: 'available',
    featured: true,
    logline: 'Where the Italian table sits down to a Japanese pantry.',
    concept:
      'A study in two kitchens that share a temperament: respect for ingredient, patience with time, and a refusal to overdress what is already complete. The book moves through technique, pantry, and pairing, drawing a line between the Florentine grill and the Tokyo counter.',
    releaseDate: '2026-01-12',
    chapters: [
      {
        title: 'I · The shared grammar',
        summary:
          'Where the two kitchens already agree — restraint, salt, time, and the trust placed in a single ingredient.',
      },
      {
        title: 'II · Salt across two seas',
        summary:
          'Colatura, shoyu, and sea salt as instruments rather than seasonings.',
      },
      {
        title: 'III · Knife, fire, restraint',
        summary:
          'Three techniques that travel between kitchens without losing their accent.',
      },
      {
        title: 'IV · A pantry in two languages',
        summary:
          'How a Tuscan shelf and a Tokyo shelf can sit beside one another and read as one larder.',
      },
    ],
    teasers: [
      {
        slug: 'shoyu-cacio-e-pepe',
        title: 'Shoyu Cacio e Pepe',
        bookSlug: 'tokyo-meets-tuscany',
        chapter: 'IV',
        heat: 'mild',
        category: 'pasta',
        headnote:
          'The Roman classic rendered with a koji-deepened soy that reads as umami rather than salt.',
        pairings: ['Pecorino Romano', 'Tellicherry pepper', 'Light shoyu'],
      },
      {
        slug: 'colatura-tsukemen',
        title: 'Colatura Tsukemen',
        bookSlug: 'tokyo-meets-tuscany',
        chapter: 'III',
        heat: 'warm',
        category: 'broth',
        headnote: 'Anchovy water as the dipping broth’s anchor.',
        pairings: ['Colatura di alici', 'Pork chashu', 'Wheat noodles'],
      },
      {
        slug: 'sansho-bistecca',
        title: 'Sanshō Bistecca',
        bookSlug: 'tokyo-meets-tuscany',
        chapter: 'II',
        heat: 'bold',
        category: 'grill',
        headnote:
          'A Florentine cut finished with citrus-bright Japanese pepper instead of black.',
        pairings: ['Chianina beef', 'Sanshō', 'Smoked olive oil'],
      },
    ],
    buyUrl: 'https://www.amazon.com',
  },
]

export const STORIES: Story[] = [
  {
    slug: 'salt-time-broth',
    title: 'Salt, time, and the patience of broth',
    standfirst:
      'A broth is the easiest thing in a kitchen to make and the hardest to make well. It asks for almost nothing except your attention.',
    author: 'Sebastian Dri',
    publishedAt: '2026-04-22',
    readTime: 6,
    themes: ['Technique'],
    body: [
      'A broth begins with water and ends with patience. Everything in between is mostly waiting, occasionally tasting, and almost never stirring.',
      'There is a moment, usually around the second hour, when the kitchen begins to smell less like raw bones and more like a room you would like to sit in. That is the broth telling you it has begun to do its work. Trust it, leave it, come back.',
      'The Italian brodo and the Japanese dashi are not the same thing, but they share a posture. Both refuse to be hurried. Both reward the cook who is willing to take less heat for longer.',
      'The salt comes last. Always last. A broth seasoned at the start lies to you for two hours and then reveals itself flat. Wait.',
    ],
    relatedPantrySlugs: ['shoyu', 'colatura'],
  },
  {
    slug: 'pantry-as-map',
    title: 'A pantry is a map of decisions',
    standfirst:
      'You can read a cook from their shelf. Not the brands — the shape of the choices.',
    author: 'Sebastian Dri',
    publishedAt: '2026-04-08',
    readTime: 5,
    themes: ['Pantry'],
    body: [
      'A pantry is not a stockpile. It is a map of the meals you intend to make and the meals you find yourself making anyway.',
      'Mine has two regions. On the left, a row of Italian glass: salt-packed anchovies, dried pasta, a small forest of olive oils ranked by weight rather than price. On the right, the Japanese shelf: shoyu by maker, mirin without sugar, a single tin of katsuobushi I refill before it runs out.',
      'In between the two regions sits a third, narrower shelf. That is where the borrowed ingredients live — the ones I reach for from either direction. Colatura. Aged miso. A small jar of sanshō. The bridge.',
    ],
    relatedPantrySlugs: ['shoyu', 'colatura', 'sansho'],
  },
  {
    slug: 'cooking-quietly',
    title: 'On cooking quietly',
    standfirst:
      'The kitchens I trust most are the ones you cannot hear from the dining room.',
    author: 'Sebastian Dri',
    publishedAt: '2026-03-19',
    readTime: 4,
    themes: ['Essay'],
    body: [
      'There is a way of cooking that does not announce itself. No clatter, no flourish, no rush at the pass. The food arrives, and it is correct, and you cannot quite trace how it got that way.',
      'I learned this from a sushi counter in Tokyo and re-learned it in a farmhouse outside Lucca. The two kitchens did almost nothing in common except this: both refused to make a show of competence.',
      'Soul does not require volume. Precision does not require coldness. The quiet kitchen contains both.',
    ],
  },
]

export const PANTRY_ENTRIES: PantryEntry[] = [
  {
    slug: 'shoyu',
    name: 'Shoyu',
    category: 'ferment',
    origin: 'Japan',
    definition:
      'Japanese soy sauce. A long fermentation of soybeans, wheat, salt, and kōji culture, aged anywhere from six months to several years.',
    flavorProfile: ['Salty', 'Umami', 'Lightly sweet', 'Toasted'],
    commonUses: [
      'Finishing dipping sauces',
      'Glazing grilled meats and fish',
      'Anchoring broths',
      'Seasoning vegetable dōnabe',
    ],
    substitutions: ['Tamari (gluten-free)', 'White shoyu (lighter)'],
    pairings: ['Mirin', 'Dashi', 'Sanshō', 'Toasted sesame'],
    relatedStorySlugs: ['salt-time-broth', 'pantry-as-map'],
    relatedPantrySlugs: ['colatura', 'sansho'],
  },
  {
    slug: 'colatura',
    name: 'Colatura di Alici',
    category: 'sea',
    origin: 'Cetara, Campania, Italy',
    definition:
      'A clear amber liquid drawn from anchovies salted in chestnut barrels over many months. The Italian cousin of fish sauce — older, quieter, and drier.',
    flavorProfile: ['Briny', 'Umami', 'Dry', 'Mineral'],
    commonUses: [
      'Finishing spaghetti without further sauce',
      'Brightening braises and stews',
      'Replacing salt in dressings',
    ],
    substitutions: ['Garum', 'Light shoyu', 'Diluted nuộc mắm (with caution)'],
    pairings: ['Garlic', 'Lemon', 'Parsley', 'Olive oil'],
    relatedStorySlugs: ['salt-time-broth', 'pantry-as-map'],
    relatedPantrySlugs: ['shoyu'],
  },
  {
    slug: 'sansho',
    name: 'Sanshō',
    category: 'aromatic',
    origin: 'Japan',
    definition:
      'A citrus-bright Japanese pepper from the prickly ash. Tingling rather than hot, with a green, almost floral lift.',
    flavorProfile: ['Citrus', 'Tingling', 'Floral', 'Cool'],
    commonUses: [
      'Finishing grilled fish or beef',
      'Seasoning fatty cuts',
      'Lifting clear broths at the last moment',
    ],
    substitutions: ['Szechuan pepper (closest relative)'],
    pairings: ['Beef', 'Eel', 'Yuzu', 'Sea salt'],
    relatedStorySlugs: ['pantry-as-map'],
    relatedPantrySlugs: ['shoyu'],
  },
]

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug)
}

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug)
}

export function getPantryBySlug(slug: string): PantryEntry | undefined {
  return PANTRY_ENTRIES.find((p) => p.slug === slug)
}

export function listBookSlugs(): string[] {
  return BOOKS.map((b) => b.slug)
}

export function listStorySlugs(): string[] {
  return STORIES.map((s) => s.slug)
}

export function listPantrySlugs(): string[] {
  return PANTRY_ENTRIES.map((p) => p.slug)
}
