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
        marker: 'I',
        title: 'The shared grammar',
        summary:
          'Where the two kitchens already agree — restraint, salt, time, and the trust placed in a single ingredient.',
      },
      {
        marker: 'II',
        title: 'Salt across two seas',
        summary:
          'Colatura, shoyu, and sea salt as instruments rather than seasonings.',
      },
      {
        marker: 'III',
        title: 'Knife, fire, restraint',
        summary:
          'Three techniques that travel between kitchens without losing their accent.',
      },
      {
        marker: 'IV',
        title: 'A pantry in two languages',
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
      { type: 'heading', text: 'When to salt' },
      'The Italian brodo and the Japanese dashi are not the same thing, but they share a posture. Both refuse to be hurried. Both reward the cook who is willing to take less heat for longer.',
      {
        type: 'pullquote',
        text: 'A broth seasoned at the start lies to you for two hours and then reveals itself flat. Wait.',
      },
      'The salt comes last. Always last. Season at the end and you taste what the bones, the kelp, the patience all wanted to say. Season at the start and you taste the salt.',
      {
        type: 'caption',
        label: 'Method note',
        text: 'A clear broth wants no boil — only a tremor at the surface, the kind you have to squint at to see.',
      },
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
      {
        type: 'pullquote',
        text: 'A pantry is the most honest document in a kitchen. It tells the truth about who actually cooks here.',
      },
      'Mine has two regions. On the left, a row of Italian glass: salt-packed anchovies, dried pasta, a small forest of olive oils ranked by weight rather than price. On the right, the Japanese shelf: shoyu by maker, mirin without sugar, a single tin of katsuobushi I refill before it runs out.',
      { type: 'heading', text: 'The bridge shelf' },
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
      {
        type: 'pullquote',
        text: 'Soul does not require volume. Precision does not require coldness. The quiet kitchen contains both.',
      },
      'The food was not minimal. It was just unhurried. There is a difference between a small plate and a small effort, and the quiet cook knows which one is happening on the bench.',
    ],
  },
  {
    slug: 'the-third-shelf',
    title: 'The third shelf',
    standfirst:
      'Some ingredients refuse a passport. They live where a Tuscan shelf and a Tokyo shelf quietly agree.',
    author: 'Sebastian Dri',
    publishedAt: '2026-02-26',
    readTime: 5,
    themes: ['Pantry'],
    body: [
      'There is a narrow shelf between the Italian glass and the Japanese tins. It holds the ingredients I never decide which kitchen owns. Colatura is the obvious one — an anchovy water older than fish sauce, hand-drawn from chestnut barrels in Cetara. Miso, aged long enough to taste of itself rather than soy. A small jar of sanshō that I treat like saffron.',
      'These ingredients are not "fusion". They are older than the word.',
      {
        type: 'pullquote',
        text: 'A bridge is not a compromise. It is a thing the river also asks for.',
      },
      'When I cook from the third shelf, the dish stops asking which country it belongs to. The shoyu in a cacio e pepe does not announce itself; the colatura on a bowl of soba does not feel like a guest. They both, quietly, do their job.',
      { type: 'heading', text: 'What earns a place here' },
      'A pantry of bridges is small. The ingredients that live there earn it by behaving the same on both sides of the border — by carrying salt, umami, brightness, or warmth without an accent. Most ingredients have accents. The ones that do not are precious.',
    ],
    relatedPantrySlugs: ['shoyu', 'colatura', 'sansho'],
  },
  {
    slug: 'why-the-knife-waits',
    title: 'Why the knife waits',
    standfirst:
      'Before any kitchen earns the right to fire, it earns the right to a clean board.',
    author: 'Sebastian Dri',
    publishedAt: '2026-02-12',
    readTime: 4,
    themes: ['Technique'],
    body: [
      'Mise en place is a French phrase but a Japanese practice. In a kitchen run well, the knife does not move until the board is ordered: the salt at the right hand, the pan at temperature, the cloth folded once and damp, the towel beneath. The knife waits.',
      'I learned this not from a recipe but from a chef who refused to begin until his bench reported back. He cut nothing for the first fifteen minutes of every service. He arranged. He breathed. Then the work began.',
      {
        type: 'pullquote',
        text: 'A clean board is not tidiness. It is the conditions under which a decision can be made cleanly.',
      },
      'Italian kitchens carry the same idea under a different name. The grandmothers I cooked with did not call it mise en place; they called it being ready. Same posture, different vocabulary. Both refused to bring a knife to a board that had not been earned.',
      {
        type: 'caption',
        label: 'Practical note',
        text: 'A wet cloth folded once, beneath the board — the board stops shifting, your shoulders stop bracing, the cuts get cleaner. A two-second move that returns the entire service.',
      },
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
    relatedStorySlugs: ['pantry-as-map', 'the-third-shelf'],
    relatedPantrySlugs: ['shoyu'],
  },
  {
    slug: 'mirin',
    name: 'Mirin',
    category: 'ferment',
    origin: 'Japan',
    definition:
      'A sweet rice wine made by fermenting glutinous rice with kōji and shōchū. The traditional version (hon-mirin) ages for at least a year and brings a clean, glossy sweetness rather than the sugar-water character of the supermarket cousin.',
    flavorProfile: ['Sweet', 'Round', 'Glossy', 'Lightly fermented'],
    commonUses: [
      'Glazing teriyaki and yakitori',
      'Balancing soy in dressings',
      'Lacquering grilled fish',
      'Rounding out dashi-based sauces',
    ],
    substitutions: ['Dry sake + a touch of cane sugar', 'White wine + honey (last resort)'],
    pairings: ['Shoyu', 'Dashi', 'Ginger', 'Yuzu zest'],
    relatedStorySlugs: ['the-third-shelf'],
    relatedPantrySlugs: ['shoyu'],
  },
  {
    slug: 'olive-oil',
    name: 'Olive Oil',
    category: 'oil',
    origin: 'Mediterranean basin',
    definition:
      'Pressed olive juice — a fat that carries flavor rather than carrying other flavors. The Italian table builds around it; a good bottle finishes a dish more than it begins one.',
    flavorProfile: ['Grassy', 'Peppery', 'Bittersweet', 'Buttery'],
    commonUses: [
      'Finishing pasta, soup, and grilled vegetables',
      'Dressing raw fish in lieu of soy',
      'Building a base sofrito',
      'Drizzling on warm bread at the table',
    ],
    pairings: ['Sea salt', 'Lemon', 'Anchovy', 'Tomato'],
    relatedPantrySlugs: ['colatura'],
  },
  {
    slug: 'katsuobushi',
    name: 'Katsuobushi',
    category: 'sea',
    origin: 'Japan',
    definition:
      'Skipjack tuna cured, smoked, fermented, and shaved into translucent flakes. The backbone of dashi and the most concentrated source of umami in the Japanese pantry.',
    flavorProfile: ['Smoky', 'Umami', 'Mineral', 'Dry'],
    commonUses: [
      'Steeping dashi',
      'Finishing okonomiyaki and tofu',
      'Strewing on hot rice',
      'Folding into vinaigrettes for fish',
    ],
    substitutions: ['Dried shiitake (different but allied umami)'],
    pairings: ['Kombu', 'Shoyu', 'Mirin', 'Tofu'],
    relatedStorySlugs: ['salt-time-broth'],
    relatedPantrySlugs: ['shoyu'],
  },
  {
    slug: 'aceto-balsamico',
    name: 'Aceto Balsamico Tradizionale',
    category: 'acid',
    origin: 'Modena, Emilia-Romagna, Italy',
    definition:
      'Grape must, cooked down and aged for at least twelve years in a battery of wooden barrels. Closer to syrup than vinegar — sweet, dark, restrained, and absurdly expensive for a reason.',
    flavorProfile: ['Sweet-tart', 'Syrupy', 'Wood-aged', 'Concentrated'],
    commonUses: [
      'Dripping (literally — drops, not pours) on parmesan',
      'Finishing strawberries and stone fruit',
      'Glazing roasted vegetables',
      'A few drops on raw beef',
    ],
    substitutions: ['Saba (grape must, not aged)', 'Reduced regular balsamic with no sugar added'],
    pairings: ['Parmigiano Reggiano', 'Strawberry', 'Fig', 'Aged beef'],
    relatedPantrySlugs: ['olive-oil'],
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
