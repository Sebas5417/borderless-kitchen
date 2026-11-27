import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Free Kitchen Planning Tools",
  description: "Count meal-prep containers, check lunch-bag fit and compare bottle sizes before buying. Free planning tools, no email required.",
  alternates: { canonical: "/tools" },
};

const origin = "https://everyday-kitchen-planner.zestylark13.chatgpt.site";
const tools = [
  { title: "Count your meal-prep containers", detail: "Calculate the packing slots you need, then subtract containers you already own.", path: "/meal-prep-container-planner", action: "Calculate my container count", id: "container-count" },
  { title: "Check lunch-bag fit", detail: "Compare your bag's usable interior with a container's outside dimensions and leave clearance.", path: "/lunch-bag-fit-checker", action: "Check whether it fits", id: "lunch-fit" },
  { title: "Compare bottle sizes", detail: "Translate 24, 32 and 40 US fluid ounces into millilitres and compare the space each size takes.", path: "/water-bottle-size-comparison", action: "Compare bottle sizes", id: "bottle-size" },
  { title: "Compare container-set costs", detail: "Enter two current prices and usable container counts. Lids are counted separately.", path: "/container-set-value-calculator", action: "Compare price per container", id: "set-value" },
  { title: "Check your cupboard layout", detail: "Estimate an upright grid using shelf interior and container exterior measurements.", path: "/container-shelf-fit-calculator", action: "Check shelf fit", id: "shelf-fit" },
  { title: "Plan a useful cooking gift", detail: "Check what they own, the space they have and what they want to learn. Print a free gift brief.", path: "/home-cook-gift-checklist", action: "Make my cooking-gift brief", id: "cook-gift" },
];

const guides = [
  { href: "/journal/chef-knife-board-fit-checklist", title: "Find a chef’s knife that fits your board", detail: "Compare blade lengths using the board and prep space you already have." },
  { href: "/journal/gochujang-shopping-list-for-two-dinners", title: "Shop for two gochujang dinners", detail: "Use the same paste for kimchi quesadillas and short-rib tacos." },
  { href: "/journal/cooking-thermometer-for-frying-and-roasting", title: "Choose a thermometer for how you cook", detail: "Compare instant-read, frying and leave-in thermometers by task." },
];

export default function ToolsPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-ui text-eyebrow uppercase text-ink/50 mb-5">Free kitchen planning tools</p>
        <h1 className="font-display text-display-1 text-ink max-w-4xl mb-6">A little planning before another purchase.</h1>
        <p className="font-body text-lg text-ink/70 max-w-prose mb-12">Choose the question you need to answer. These tools work without an email address or a purchase.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.id} className="border border-hairline p-6 flex flex-col">
              <h2 className="font-display text-2xl text-ink mb-4">{tool.title}</h2>
              <p className="font-body text-base text-ink/70 mb-6">{tool.detail}</p>
              <a href={`${origin}${tool.path}?utm_source=borderlesskitchen&utm_medium=referral&utm_campaign=kitchen_tools_oct2026&utm_content=${tool.id}`} target="_blank" rel="noopener noreferrer" className="mt-auto inline-block font-ui text-eyebrow uppercase text-paper bg-ink px-5 py-3 hover:bg-vermillion transition-colors">{tool.action} ↗</a>
            </article>
          ))}
        </div>
        <section aria-labelledby="kitchen-guides" className="mt-10 border-t border-hairline pt-8">
          <h2 id="kitchen-guides" className="font-display text-2xl text-ink mb-5">
            Kitchen buying guides
          </h2>
          <ul className="grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <li key={guide.href} className="border border-hairline p-5">
                <Link href={guide.href} className="font-display text-lg text-ink underline underline-offset-4 hover:text-vermillion">
                  {guide.title}
                </Link>
                <p className="font-body text-base text-ink/70 mt-3">{guide.detail}</p>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-10 border-t border-hairline pt-8">
          <p className="font-body text-base text-ink/70 max-w-prose mb-5">Want to plan the whole kit? Compare scales, containers and bottles by your cleaning and storage needs, then print a free shopping checklist.</p>
          <a href={`${origin}/kitchen-kit-builder?utm_source=borderlesskitchen&utm_medium=referral&utm_campaign=kitchen_tools_oct2026&utm_content=complete-kit`} target="_blank" rel="noopener noreferrer" className="inline-block font-ui text-eyebrow uppercase text-ink border border-ink/30 px-6 py-3 hover:border-vermillion hover:text-vermillion transition-colors">Build my kitchen kit ↗</a>
          <p className="font-body text-xs text-ink/50 mt-6 max-w-prose">The planning tools contain Amazon affiliate links. We may earn a commission from qualifying purchases. The tools are free whether or not you buy anything.</p>
          <Link href="/shop" className="block font-body text-sm text-ink/70 mt-5 hover:text-vermillion">Back to pantry ingredients and equipment →</Link>
        </div>
      </Container>
    </section>
  );
}
