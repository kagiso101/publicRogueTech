/**
 * Per-suburb landing page content. Each entry must read as a genuinely
 * different page — different business landscape, different angle — never a
 * name-swap of another suburb (Google treats near-duplicates as doorway spam).
 *
 * To add a suburb: add an entry here and a route in app.routes.ts.
 */

export interface SuburbSection {
  heading: string;
  paragraphs: string[];
}

export interface SuburbContent {
  /** URL slug: /web-design-{slug} */
  slug: string;
  name: string;
  /** <title> — under ~60 chars, keyword first. */
  seoTitle: string;
  /** Meta description — under ~155 chars. */
  seoDescription: string;
  /** Paragraphs under the H1. */
  intro: string[];
  /** The suburb's actual business landscape. */
  landscape: SuburbSection;
  /** What a website should do for that kind of business. */
  websiteAngle: SuburbSection;
  /** One-liner rendered in the "we're local" block. */
  localLine: string;
}

export const SUBURBS: SuburbContent[] = [
  {
    slug: 'table-view',
    name: 'Table View',
    seoTitle: 'Website Design Table View | RogueTech',
    seoDescription:
      'Website design in Table View from R8,500. Local Cape Town developers building sites that bring in customers for salons, trades, fitness and food businesses.',
    intro: [
      'Table View runs on small business. From the beachfront cafés watching the kitesurfers to the salons, gyms and hardware suppliers packed along Blaauwberg Road, this is one of the busiest independent-business strips on the West Coast — and almost every one of those businesses is competing for the same local customers.',
      'Those customers are not paging through directories. When someone in Table View needs a plumber, a physio or a Saturday-morning breakfast spot, they search on their phone and pick from the first few results. If your business is not there — or the site they land on looks like it was abandoned in 2015 — the customer goes to the competitor two doors down. We build websites that stop that from happening.',
    ],
    landscape: {
      heading: 'Built for the businesses that actually operate here',
      paragraphs: [
        'We know what trades in Table View: beauty and hair salons, fitness studios and personal trainers, home services like plumbing, electrical and garden care, restaurants and takeaways feeding the beachfront crowds, and the professional services — accountants, physios, letting agents — serving one of Cape Town’s densest residential catchments.',
        'These businesses share a pattern: nearly all their customers live or work within a few kilometres, decide quickly, and judge on first impressions. A salon lives or dies on whether new clients can see the work, check prices and book without phoning. A plumber wins the job by being findable at 9pm when the geyser bursts. A restaurant fills quiet weeknights with a menu that loads instantly on a phone.',
      ],
    },
    websiteAngle: {
      heading: 'What your website needs to do in Table View',
      paragraphs: [
        'For a local-service business, a website has exactly one job: turn a search into a booking, a call or a quote request. That means showing up in Google for “near me” searches, loading fast on mobile data, making the phone number and booking button impossible to miss, and looking professional enough that a stranger trusts you with their money. Everything we build for Table View businesses is designed backwards from that moment.',
        'We also set up the plumbing most template sites skip: proper page titles Google can read, a Google Business Profile that points at your site, and analytics so you can see exactly which pages bring in the calls.',
      ],
    },
    localLine:
      'We work with businesses along the whole Blaauwberg corridor and can meet you in person — coffee on Blaauwberg Road beats another video call.',
  },
  {
    slug: 'parklands',
    name: 'Parklands',
    seoTitle: 'Website Design Parklands | RogueTech',
    seoDescription:
      'Website design in Parklands from R8,500. Websites for the schools, medical practices, home services and family businesses serving Cape Town’s fastest-growing suburb.',
    intro: [
      'Parklands is one of the fastest-growing suburbs in Cape Town, and it grows in a very particular way: young families and first-time homeowners arriving in waves as each new development fills up. Every one of those households needs an aftercare, a dentist, a garden service, a driving school — and they arrive knowing nobody.',
      'That last part matters more than anything else on this page. In an established suburb, business flows through word of mouth built over decades. In Parklands, thousands of your potential customers moved in recently and have no word-of-mouth network to ask. They find everything the same way: they search. The businesses that win Parklands are simply the ones that show up well online.',
    ],
    landscape: {
      heading: 'A suburb of new households and the businesses that serve them',
      paragraphs: [
        'The Parklands economy is domestic: crèches, schools and aftercare programmes, medical and dental practices, beauty and wellness, home maintenance and cleaning services, security installers, and the estate agents and bond originators riding the constant churn of new developments.',
        'For these businesses, trust is the entire sale. A parent choosing an aftercare or a homeowner letting a cleaner through the front gate wants to see faces, credentials, real photos and real reviews before they make contact. A thin Facebook page does not carry that weight. A proper website does.',
      ],
    },
    websiteAngle: {
      heading: 'Turning new residents into long-term customers',
      paragraphs: [
        'The websites we build for Parklands businesses are trust machines: clear service pages that answer the questions parents and homeowners actually ask, photographs of your actual team and premises rather than stock images, reviews pulled in where they can be seen, and contact forms that reach you instantly — because the family that emails three aftercares at 8pm signs up with the one that answers first.',
        'And because your customers are searching from day one of moving in, we structure every page so Google understands exactly what you do and where you do it. That is how you become the default choice for each new wave of arrivals.',
      ],
    },
    localLine:
      'We are from this side of the city — we work with businesses across the Blaauwberg corridor and are happy to meet face to face in Parklands.',
  },
  {
    slug: 'bloubergstrand',
    name: 'Bloubergstrand',
    seoTitle: 'Website Design Bloubergstrand | RogueTech',
    seoDescription:
      'Website design in Bloubergstrand from R8,500. Direct-booking websites for guesthouses, restaurants, surf schools and tourism businesses on the Blouberg beachfront.',
    intro: [
      'Bloubergstrand has something almost no other suburb in the world can claim: the postcard view of Table Mountain. That view built an entire local economy — guesthouses and self-catering apartments, beachfront restaurants, kitesurfing and surf schools, photographers and tour operators — and it means Blouberg businesses sell to a global audience, not just a local one.',
      'A German kitesurfer planning a January trip or a Joburg family booking a beach weekend will never walk past your door first. Your website is your door. It gets judged against international standards, in a language the visitor may only half speak, on a phone, often on holiday Wi-Fi. That is a very specific design problem, and it is one we enjoy solving.',
    ],
    landscape: {
      heading: 'A tourism economy with an international shop window',
      paragraphs: [
        'Hospitality dominates here, and hospitality has a costly dependency: booking platforms. Every reservation that arrives through an OTA gives away 15–20% commission. A guesthouse that shifts even a third of its bookings to its own website saves more per year than the website costs — which is why a direct-booking site is the single highest-return investment a Blouberg accommodation business can make.',
        'The same logic runs through the rest of the beachfront economy. Surf and kite schools take deposits online from customers still in another hemisphere. Restaurants convert sunset-view searches into reservations. Photographers sell shoots to visitors who found them on Google Images. In every case the website is not a brochure — it is the till.',
      ],
    },
    websiteAngle: {
      heading: 'Built to convert visitors from anywhere',
      paragraphs: [
        'For Bloubergstrand businesses we build sites that carry the view properly — full-width photography that loads fast even on hotel Wi-Fi — backed by the machinery international customers expect: online booking or enquiry flows, clear pricing, and pages structured so Google surfaces you for the searches travellers actually type, from “kitesurfing lessons Cape Town” to “restaurant Table Mountain view”.',
        'Everything is mobile-first and measurable: you will see where your bookings come from, which pages convert, and how much commission you are no longer paying to a platform.',
      ],
    },
    localLine:
      'We are local to the Blaauwberg corridor — we can walk your property, shoot the brief on-site, and meet in person whenever it helps.',
  },
  {
    slug: 'milnerton',
    name: 'Milnerton',
    seoTitle: 'Website Design Milnerton | RogueTech',
    seoDescription:
      'Website design in Milnerton from R8,500. Quote-generating websites for the trades, suppliers, marine and B2B businesses of Milnerton and Montague Gardens.',
    intro: [
      'Milnerton is the working heart of the western seaboard. It is one of the area’s oldest suburbs, and its economy shows it: established trades and contractors, suppliers and light industry spilling over from Montague Gardens and Paarden Eiland, marine and boating businesses around the lagoon, and the retail strip along Koeberg Road that has served the suburb for decades.',
      'Many of these are solid businesses that have run for twenty years on reputation and repeat customers — and are now watching younger competitors with better websites take the new business. Going digital late is not a problem. Going digital badly, with a rushed template that undersells two decades of work, is. We specialise in the first kind of project.',
    ],
    landscape: {
      heading: 'B2B, trades and industry — where the quote is everything',
      paragraphs: [
        'Milnerton business is quote-driven. A facilities manager needing a flooring contractor, a factory sourcing a packaging supplier, a boat owner looking for repairs — they shortlist three companies online and send enquiries. If your website does not make the shortlist, your price is never even heard.',
        'B2B buyers judge differently from consumers. They look for evidence: how long you have operated, which projects you have delivered, what equipment you run, whether you are the kind of outfit that shows up when promised. A website that presents that evidence cleanly does the pre-selling before the first phone call.',
      ],
    },
    websiteAngle: {
      heading: 'Websites that generate quote requests, not compliments',
      paragraphs: [
        'For Milnerton businesses we build sites around the quote pipeline: service pages for each thing you actually sell (because “industrial flooring Cape Town” and “epoxy warehouse floor” are different searches), project galleries that prove capability, and quote forms that capture enough detail for you to respond with a real number instead of a phone-tag marathon.',
        'For the established firms, we also handle the unglamorous migration work properly — keeping the Google ranking your old site earned, redirecting old links, and making sure the switch never costs you an enquiry.',
      ],
    },
    localLine:
      'We work along the whole corridor from Milnerton to Melkbos and are happy to meet at your premises — workshops and warehouses included.',
  },
  {
    slug: 'sunningdale',
    name: 'Sunningdale',
    seoTitle: 'Website Design Sunningdale | RogueTech',
    seoDescription:
      'Website design in Sunningdale from R8,500. Professional websites for the consultants, practitioners and home-based businesses of Sunningdale and Sandown.',
    intro: [
      'Sunningdale is the quiet achiever of the Blaauwberg corridor: a newer, well-planned residential suburb where a striking number of businesses operate from home offices and small practices. Consultants, bookkeepers, tutors, therapists, health practitioners, boutique agencies — professionals who traded the commute for the suburb and run serious businesses without a shopfront.',
      'When you do not have a shopfront, your website is the shopfront. It is the only place a potential client can size you up before making contact — and it either says “established professional” or it says “side hustle”. Nothing between those two.',
    ],
    landscape: {
      heading: 'Professionals and practices, minus the office block',
      paragraphs: [
        'The Sunningdale and Sandown business community is heavy on expertise-based services: financial and legal consultants, coaches and tutors, psychologists and physiotherapists, designers and specialist contractors. Clients for these services choose carefully — they are buying judgement and trust, not a product they can inspect.',
        'That choice increasingly happens entirely online. A prospective client reads your site, checks your credentials, maybe compares two competitors, and only then sends one enquiry. There is no second impression: by the time you know they exist, they have already decided whether you look credible.',
      ],
    },
    websiteAngle: {
      heading: 'Look as established as you actually are',
      paragraphs: [
        'For Sunningdale professionals we build websites that do the credibility work: a clear articulation of what you do and who you do it for, qualifications and professional registrations where clients can verify them, testimonials with real names, and a booking or enquiry flow that respects both your calendar and theirs.',
        'Done right, a solo practitioner’s website reads with the same authority as a firm five times the size — which is exactly the point. Your expertise deserves better than a template that looks like everyone else’s.',
      ],
    },
    localLine:
      'We are neighbours, effectively — RogueTech works across the Blaauwberg corridor and meets clients in person, whether that is your home office or a coffee shop in Sandown.',
  },
];

export function getSuburb(slug: string): SuburbContent | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
