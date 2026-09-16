/**
 * Single source of truth for every FAQ on the site.
 *
 * - /faq renders the full catalogue grouped by category (FAQ_CATEGORIES)
 * - the home page shows the items flagged `home`
 * - /pricing shows the `pricing` category
 *
 * Edit answers here and every surface (plus the FAQPage JSON-LD) updates.
 */

export interface FaqItem {
  q: string;
  a: string;
  category: FaqCategoryId;
  /** Shown in the "Most Asked" strip on /faq. */
  featured?: boolean;
  /** Shown in the FAQ section on the home page. */
  home?: boolean;
}

export type FaqCategoryId = 'pricing' | 'process' | 'ownership' | 'technical' | 'working';

export interface FaqCategory {
  id: FaqCategoryId;
  label: string;
  description: string;
  /** SVG path data, rendered inside a 24x24 viewBox. */
  icon: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'pricing',
    label: 'Pricing & Billing',
    description: 'Costs, payments, VAT, invoicing',
    icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  },
  {
    id: 'process',
    label: 'Process & Delivery',
    description: 'How projects unfold from start to launch',
    icon: 'M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  },
  {
    id: 'ownership',
    label: 'Ownership & Rights',
    description: 'Who owns what, domain, hosting',
    icon: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z',
  },
  {
    id: 'technical',
    label: 'Technical',
    description: 'Stack, hosting, integrations, support',
    icon: 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
  },
  {
    id: 'working',
    label: 'Working Together',
    description: 'Communication, location, fit',
    icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  },
];

export const FAQS: FaqItem[] = [
  // ─── PRICING ───
  {
    q: 'How much does a project cost?',
    a: 'Project fees start at R8,500 for our Bronze package and scale up to R120,000+ for custom Platinum builds. Silver (R22,000) and Gold (R55,000) sit between. See the Pricing page for full breakdown.',
    category: 'pricing',
    featured: true,
  },
  {
    q: 'Why is the project a one-off fee instead of a subscription?',
    a: 'Because you should own what you pay for. Subscription website packages lock clients into ongoing commitments for work already delivered. We build it, you own it, and any ongoing services are entirely your choice.',
    category: 'pricing',
  },
  {
    q: 'Are there any hidden costs?',
    a: 'No. The project fee covers the full build as scoped. Domain and hosting are paid by you directly to your providers. Add-ons are clearly priced and never required. Any change in scope is quoted before any work happens.',
    category: 'pricing',
  },
  {
    q: 'When do I pay?',
    a: 'A 50% deposit is invoiced at project kickoff. The remaining 50% is invoiced at launch. For Platinum and larger projects, payment is structured around milestones — discussed during the proposal phase.',
    category: 'pricing',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'EFT bank transfer to a South African business account. For international clients, wire transfer in USD or EUR. All invoices include 15% VAT where applicable.',
    category: 'pricing',
  },
  {
    q: 'Do prices include VAT?',
    a: 'All prices listed are exclusive of VAT. Standard South African VAT (15%) is added to the final invoice where applicable.',
    category: 'pricing',
  },

  {
    q: 'Do I have to commit to anything ongoing?',
    a: 'No. You pay once for the project and own it outright. Optional add-ons like the Care Plan, SEO and social management are month-to-month — start, pause or cancel at any time.',
    category: 'pricing',
    home: true,
  },
  {
    q: 'Can I start small and upgrade later?',
    a: 'Yes. Many clients begin with Bronze or Silver and grow into Gold as their business expands. We credit work already delivered so you only pay the difference plus any new scope.',
    category: 'pricing',
    home: true,
  },

  // ─── PROCESS ───
  {
    q: 'How long does it take to build my website?',
    home: true,
    a: 'Bronze packages typically launch in 1–2 weeks. Silver in 3–4 weeks. Gold in 6–10 weeks. Platinum projects scope per engagement, usually 3–6 months. You always have a confirmed timeline before any payment.',
    category: 'process',
    featured: true,
  },
  {
    q: 'What happens if I want to cancel mid-project?',
    a: 'You can stop a project at any point. You pay only for the work completed up to that point and you receive everything we have built so far. We do not lock you into completing a project you no longer want.',
    category: 'process',
  },
  {
    q: 'How involved do I need to be?',
    a: 'You approve at five key milestones — proposal, design, build progress, QA review, and final launch. Between those, we keep you updated with weekly demos and written updates without overwhelming you.',
    category: 'process',
  },
  {
    q: 'Can I make changes after the project launches?',
    a: 'Yes. Subscribe to a Care Plan (R450/month) for an included monthly update allowance, or pay per request at R350/hour for small changes. New features are quoted separately from R1,500.',
    category: 'process',
  },
  {
    q: 'What if I do not like the design?',
    a: 'You see designs and approve them before any code is written. Two rounds of revisions are included. If we are still not aligned after that, we have an honest conversation about whether the project should continue.',
    category: 'process',
  },

  // ─── OWNERSHIP ───
  {
    q: 'Do I own my website?',
    home: true,
    a: 'Yes — always. ROGUETECHNOLOGIES owns no part of your site. Code, content, designs, domain, hosting accounts — all yours from day one. If you ever want to take your project elsewhere, you take everything with you.',
    category: 'ownership',
    featured: true,
  },
  {
    q: 'Do you provide domains and hosting?',
    a: 'No, but we handle all the technical setup. You register and own your domain and hosting directly with the provider — meaning you can never be locked in. We advise on the right providers and configure everything for you.',
    category: 'ownership',
  },
  {
    q: 'What happens if I want to switch agencies later?',
    a: 'Nothing complicated. You already own the code, the domain, and the hosting accounts. We hand over full credentials and documentation at launch. Any agency can pick up the work without our involvement.',
    category: 'ownership',
  },
  {
    q: 'Who owns the designs and creative assets?',
    a: 'You do. Once the final invoice is paid, all designs, illustrations, and creative assets created specifically for your project belong to you outright.',
    category: 'ownership',
  },

  // ─── TECHNICAL ───
  {
    q: 'What technology do you build with?',
    a: 'Our standard stack is Angular for the frontend, Spring Boot for backend services, and PostgreSQL for databases. We also work with TypeScript, REST APIs, and modern DevOps tooling. For simple Bronze sites, we use lightweight HTML/CSS/JS where appropriate.',
    category: 'technical',
  },
  {
    q: 'Where is my site hosted?',
    a: 'Wherever you choose. We advise on appropriate hosting based on your project — typical recommendations include Xneelo, HostKing, or Afrihost for South African clients, or international options like SiteGround and DigitalOcean for global audiences.',
    category: 'technical',
  },
  {
    q: 'Can you integrate with third-party services?',
    a: 'Yes. We routinely integrate payment gateways (Yoco, Peach Payments, Stripe), CRM systems, email services, analytics platforms, and custom APIs. Integrations beyond standard scope are quoted as part of the project.',
    category: 'technical',
  },
  {
    q: 'Do you build mobile apps?',
    a: 'Our focus is web — including responsive websites and progressive web apps that work beautifully on mobile devices. For native iOS/Android apps, we partner with specialist mobile developers but it is not our primary service.',
    category: 'technical',
  },
  {
    q: 'Is my site secure?',
    a: 'Yes. SSL is configured at launch on every project. Gold and Platinum builds include additional security measures: input validation, secure authentication, rate limiting, and where applicable, security audits before deployment.',
    category: 'technical',
  },

  // ─── WORKING TOGETHER ───
  {
    q: 'Do you work outside of Cape Town?',
    home: true,
    a: 'Yes. We are based in Cape Town and work remotely with clients across South Africa and internationally. Your location does not matter; collaboration happens over video calls, email and weekly written updates.',
    category: 'working',
  },
  {
    q: 'I am not technical at all — is ROGUETECHNOLOGIES for me?',
    home: true,
    a: 'That is exactly who we built this for. You do not need to understand any of it. We handle everything and keep you in the loop with weekly demos and plain-language updates, without overwhelming you with jargon.',
    category: 'working',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'Primary communication is email plus a written update every week. We also schedule video calls at key milestones and respond to email within 24 business hours.',
    category: 'working',
  },
  {
    q: 'Are you compliant with South African law?',
    a: 'Yes. All engagements operate under POPIA, CPA, and ECTA. You receive a formal service agreement before any work begins.',
    category: 'working',
  },
  {
    q: 'What if my project is too small or too unusual?',
    a: 'We have an honest discovery conversation before either party commits. If we are not the right fit, we will tell you and where possible recommend someone who is.',
    category: 'working',
  },
];

export function faqsFor(category: FaqCategoryId): FaqItem[] {
  return FAQS.filter((f) => f.category === category);
}

export const HOME_FAQS: FaqItem[] = FAQS.filter((f) => f.home);

export const FEATURED_FAQS: FaqItem[] = FAQS.filter((f) => f.featured);
