/**
 * Industry landing page content (Phase 3B of the SEO spec). These target
 * national service-niche searches ("website for salon south africa") where
 * competition is thin and intent matches our prospect profile.
 *
 * Booking-related pages cross-sell Bookvas: website + deposit-secured online
 * bookings as one offer. Keep Bookvas claims to that framing.
 */

export interface IndustrySection {
  heading: string;
  paragraphs: string[];
}

export interface IndustryFaq {
  q: string;
  a: string;
}

export interface IndustryContent {
  /** Route path, e.g. 'websites-for-salons'. */
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string[];
  sections: IndustrySection[];
  packageRec: IndustrySection;
  /** Bookvas cross-sell block — present on booking-related pages. */
  bookr?: IndustrySection;
  faqs: IndustryFaq[];
}

export const INDUSTRIES: IndustryContent[] = [
  {
    slug: 'websites-for-salons',
    seoTitle: 'Websites for Salons South Africa | RogueTech',
    seoDescription:
      'Websites for salons and beauty businesses in South Africa from R8,500 — portfolio, price list and deposit-secured online booking that actually kills no-shows.',
    h1: 'Websites for Salons & Beauty Businesses in South Africa',
    intro: [
      'Salon work is visual, personal and appointment-based — which is why most South African salons run their whole business on Instagram and WhatsApp. It works, right up to the ceiling: the algorithm decides who sees your work, every booking takes a WhatsApp conversation, and no-shows quietly eat a chunk of every week\'s takings.',
      'A proper salon website doesn\'t replace Instagram. It fixes the three problems Instagram can\'t.',
    ],
    sections: [
      {
        heading: 'The three problems every salon knows',
        paragraphs: [
          'First, discovery. When someone new to the area searches "nail salon near me" or "balayage Cape Town", Google shows websites — not Instagram accounts. An Instagram-only salon simply isn\'t in that race, and those searchers are the highest-intent new clients you can get.',
          'Second, booking chaos. WhatsApp bookings mean every appointment costs a conversation: back-and-forth about times, screenshots of the price list, messages at 10pm, and the occasional double-booking when two chats happen at once. That admin is hours of unpaid work every week.',
          'Third, no-shows. When booking costs the client nothing, skipping costs them nothing. Every empty chair is stock, rent and a stylist\'s time paid for with no revenue against it.',
        ],
      },
      {
        heading: 'What a salon website should actually do',
        paragraphs: [
          'A gallery that does your work justice, a price list that answers the question every client asks first, your location and hours where Google can read them, and a booking button that works while you\'re mid-client. Reviews pulled in where new visitors can see them, because in this industry social proof is the sale.',
          'Structured properly, that same site is what ranks for the "near me" searches — so the website pays for itself in exactly the clients you can\'t reach today.',
        ],
      },
    ],
    packageRec: {
      heading: 'Which package fits a salon',
      paragraphs: [
        'Most salons start with Bronze (R8,500) — a sharp one-to-three page site with gallery, price list and booking CTA, live inside two weeks. Salons with multiple stylists, service menus or retail move to Silver (R22,000) for a full multi-page build with content you can update yourself.',
      ],
    },
    bookr: {
      heading: 'Kill no-shows with deposit-secured booking',
      paragraphs: [
        'We pair salon websites with Bookvas, our online booking system: clients pick a slot and secure it with a deposit. No more 10pm WhatsApp scheduling, no more double bookings — and when skipping an appointment costs the client their deposit, no-shows collapse. Website plus deposit-secured bookings, sold as one offer.',
      ],
    },
    faqs: [
      {
        q: 'How much does a salon website cost in South Africa?',
        a: 'From R8,500 once-off with RogueTech for a professional custom site with gallery, price list and booking call-to-action. Bigger salons with multiple stylists and service menus typically land around R22,000. You own the site outright — no monthly rental.',
      },
      {
        q: 'Can clients book appointments on the website?',
        a: 'Yes — we pair salon sites with Bookvas, our deposit-secured online booking system. Clients choose a slot and pay a deposit to lock it in, which is what actually stops no-shows.',
      },
      {
        q: 'Do I still need Instagram if I have a website?',
        a: 'Keep Instagram — it is your portfolio and your community. The website does the jobs Instagram cannot: ranking on Google when new clients search, showing prices without a DM, and taking secured bookings while you work.',
      },
      {
        q: 'How do booking deposits work?',
        a: 'The client pays a deposit online when they book, which you set — a fixed amount or a percentage of the service. It comes off their bill when they arrive. If they no-show, the deposit covers your time.',
      },
    ],
  },
  {
    slug: 'websites-for-wellness',
    seoTitle: 'Websites for Wellness Practices | RogueTech',
    seoDescription:
      'Websites for spas, therapists and wellness practitioners in South Africa from R8,500 — credibility, clear pricing and online booking that respects your session time.',
    h1: 'Websites for Spas, Therapists & Wellness Practitioners',
    intro: [
      'Wellness clients choose carefully. Whether it\'s a massage therapist, a psychologist, a physio or a day spa, the client is trusting you with their body or their mind — and they research before they book. That research happens on your website, or on a competitor\'s.',
      'Most wellness practices in South Africa are past the word-of-mouth ceiling: fully dependent on referrals, invisible to everyone else. A website is how you grow beyond the clients your clients happen to know.',
    ],
    sections: [
      {
        heading: 'What wellness clients look for before booking',
        paragraphs: [
          'Credentials they can verify — qualifications, professional registrations, association memberships. A clear description of what you treat and how a first session works, because uncertainty is the biggest barrier to booking. Real photographs of the space, so they know what walking in feels like. And pricing: practitioners who hide prices lose the clients who were too polite to ask.',
          'A wellness website is a credibility document first and a brochure second. Done right, a solo practitioner reads with the authority of an established practice — because that is what they are.',
        ],
      },
      {
        heading: 'The admin problem nobody talks about',
        paragraphs: [
          'A practitioner in session cannot answer the phone — so bookings happen in the gaps, on WhatsApp, in the evenings. That is unpaid admin layered onto clinical work, and it caps how full your diary can get. Online booking moves that entire workload to the website: clients see real availability and book themselves, day or night.',
          'For single-practitioner businesses, no-shows hurt more than anyone: an empty hour is an hour of revenue gone with costs unchanged. Deposit-secured booking fixes the economics — a client who has paid a deposit shows up.',
        ],
      },
    ],
    packageRec: {
      heading: 'Which package fits a wellness practice',
      paragraphs: [
        'Solo practitioners start with Bronze (R8,500): credentials, services, pricing and booking on a site that builds trust fast. Multi-practitioner practices, spas with treatment menus, or practices that publish content move to Silver (R22,000) with a content system you manage yourself.',
      ],
    },
    bookr: {
      heading: 'Booking that respects your session time',
      paragraphs: [
        'We pair wellness websites with Bookvas for deposit-secured online booking: clients book real slots and secure them with a deposit, so your diary fills itself and no-shows stop costing you hours. One offer — the website and the booking system, built to work together.',
      ],
    },
    faqs: [
      {
        q: 'How much does a website for a therapist or spa cost?',
        a: 'From R8,500 once-off for a professional practitioner site — credentials, services, pricing and booking. Multi-room spas and group practices typically land around R22,000. No monthly website rental; you own everything.',
      },
      {
        q: 'Can clients book sessions online?',
        a: 'Yes. We integrate Bookvas, our deposit-secured booking system: clients see your real availability, book a slot and pay a deposit to secure it — including while you are in session.',
      },
      {
        q: 'I rely on referrals — do I really need a website?',
        a: 'Referrals are your best channel, but they cap your growth at the people your clients know. A website captures everyone else: the searchers typing "physio near me" or "couples counselling Cape Town" who have never heard your name. It also does the credibility work even for referred clients, who almost always look you up before calling.',
      },
      {
        q: 'Will my site mention my professional registrations?',
        a: 'Prominently — registrations, qualifications and association memberships are the strongest trust signals a wellness site has, and we structure them so both clients and Google can read them.',
      },
    ],
  },
  {
    slug: 'booking-websites',
    seoTitle: 'Booking Websites for Service Businesses | RogueTech',
    seoDescription:
      'Booking websites for South African service businesses: your site plus Bookvas deposit-secured online bookings as one offer. Kill no-shows and WhatsApp scheduling chaos.',
    h1: 'Booking Websites for Service Businesses',
    intro: [
      'If your business runs on appointments — salons, barbers, therapists, trainers, tutors, groomers, consultants — then bookings are not a feature of your business. They are the business. Every gap in the diary is revenue that never existed, and every hour spent scheduling is an hour not earning.',
      'Yet most South African service businesses still take bookings the expensive way: a WhatsApp conversation per appointment, a paper diary or a spreadsheet, and a no-show rate everyone has learned to shrug at. A booking website replaces all of it.',
    ],
    sections: [
      {
        heading: 'What WhatsApp scheduling really costs',
        paragraphs: [
          'Count a week honestly: the back-and-forth to find a slot, the price-list screenshots, the evening messages, the reschedules, the double-booking apologies. For a busy solo operator that is five to ten unpaid hours a week — a part-time job\'s worth of admin spent servicing the diary instead of clients.',
          'Then the no-shows. When booking costs nothing, cancelling costs nothing, and skipping without a word costs nothing either. Industry no-show rates of 10–20% mean one working day in every week or two is paid for — rent, stock, staff — and earns nothing back.',
        ],
      },
      {
        heading: 'What a booking website actually is',
        paragraphs: [
          'It is your website — the thing that ranks on Google, shows your work and your prices, and convinces a stranger you\'re worth booking — with a live booking system behind it. Clients see actual availability and book themselves, any hour of the day. You set the rules: services, durations, working hours, how much deposit secures a slot.',
          'The deposit is the part that changes behaviour. A client with money down confirms, arrives, or gives you notice — because the deposit is theirs to lose. Businesses feel this in the first month: the diary stops leaking.',
        ],
      },
    ],
    packageRec: {
      heading: 'Which package fits',
      paragraphs: [
        'For most service businesses this is Silver (R22,000): a full multi-page website with your services, pricing and content system, integrated with online booking. Businesses with custom workflows — multiple staff calendars, rooms or equipment, package deals — move into Gold (R55,000) where we build the booking logic around how you actually operate.',
      ],
    },
    bookr: {
      heading: 'One offer: your website + Bookvas',
      paragraphs: [
        'Bookvas is our booking platform, built for exactly this: deposit-secured online bookings for service businesses. We sell it the way it should be bought — together with your website as a single offer, designed as one experience. Your site brings the client in; Bookvas locks the appointment down with a deposit; your diary fills itself while you work.',
        'Because we build both, there is no plugin duct tape and no monthly bolt-on surprise: one build, one team responsible for the whole flow from Google search to confirmed, deposit-paid booking.',
      ],
    },
    faqs: [
      {
        q: 'What does a booking website cost?',
        a: 'Most booking websites are our Silver package at R22,000 once-off: full custom website plus Bookvas deposit-secured online booking, sold as one offer. Complex multi-staff or multi-room operations are scoped in Gold from R55,000.',
      },
      {
        q: 'How do booking deposits work?',
        a: 'You choose the deposit — fixed amount or percentage per service. The client pays it online to confirm their slot, and it comes off their bill. No-show, and the deposit covers your time. It is the single most effective no-show fix there is.',
      },
      {
        q: 'Can clients still book over WhatsApp or the phone?',
        a: 'Of course — you can always add a booking to your own calendar manually. The point of the website is that most clients stop needing to: they book and pay their deposit themselves, including outside business hours when a third of bookings happen.',
      },
      {
        q: 'Will the booking system fit how my business works?',
        a: 'We set Bookvas up around your services, durations, staff and hours as part of the build, and Gold-tier projects get custom booking logic built to spec. We scope this with you before any price is final.',
      },
      {
        q: 'Do I own the website?',
        a: 'Yes — domain, design, code and content, all in your name, like every RogueTech build. Bookvas runs as a service behind your site; the site itself is yours outright.',
      },
    ],
  },
];

export function getIndustry(slug: string): IndustryContent | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
