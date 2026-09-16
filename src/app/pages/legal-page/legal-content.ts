/**
 * Legal documents rendered by LegalPage. Plain-language drafts for a small Cape Town
 * agency — have a lawyer review before relying on them in a dispute.
 */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  slug: 'terms' | 'privacy' | 'cookies';
  title: string;
  seoTitle: string;
  seoDescription: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = 'ROGUETECHNOLOGIES (Pty) Ltd';
const REG = '2026/428113/07';
const EMAIL = 'info@rogue-tech.co.za';

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: 'privacy',
    title: 'Privacy Notice',
    seoTitle: 'Privacy Notice — ROGUETECHNOLOGIES',
    seoDescription:
      'How ROGUETECHNOLOGIES (Pty) Ltd collects, uses and protects personal information under POPIA when you enquire through rogue-tech.co.za.',
    updated: '16 September 2026',
    intro: `${COMPANY} (registration ${REG}), Cape Town, South Africa, is the responsible party for personal information collected through this website. This notice explains what we collect, why, who we share it with and the rights you have under the Protection of Personal Information Act (POPIA).`,
    sections: [
      {
        heading: 'What we collect',
        bullets: [
          'Enquiry details you give us through the Get Started wizard, the consultation form or email: your name, email address, phone number (optional), business name, industry, project type and details, budget range, timeline and any notes.',
          'Technical details recorded when you submit a form: your IP address and browser identifier. We keep these to prevent abuse of the form and as part of the consent record.',
          'Anonymous usage statistics through Google Analytics 4, only when analytics is enabled on the site. Analytics never receives your name, email or form contents.',
          'If you book a call, Cal.com processes your name and email to create the booking under its own privacy policy.',
        ],
      },
      {
        heading: 'Why we use it',
        bullets: [
          'To respond to your enquiry, prepare a quote and, if you become a client, deliver the project — on the basis of your consent and the steps needed to enter a contract with you.',
          'To keep a record that you consented to being contacted, as POPIA requires.',
          'To protect the website and our systems from spam and abuse.',
          'To understand which pages are useful, so we can improve the site.',
        ],
      },
      {
        heading: 'Who we share it with',
        paragraphs: [
          'We do not sell personal information. We use a small number of service providers who process it on our behalf under contract:',
        ],
        bullets: [
          'Google Cloud (South Africa region) hosts the enquiry database and API.',
          'Netlify hosts this website.',
          'Resend delivers our transactional emails (your confirmation and our internal notification).',
          'Google Analytics provides anonymous usage statistics, when enabled.',
          'Cal.com schedules strategy calls, if you choose to book one.',
        ],
      },
      {
        heading: 'Transfers outside South Africa',
        paragraphs: [
          'Netlify, Resend, Google Analytics and Cal.com may process information outside South Africa. Each is bound by contractual terms that provide protection substantially similar to POPIA, as section 72 of the Act requires.',
        ],
      },
      {
        heading: 'How long we keep it',
        bullets: [
          'Enquiries that do not become projects: 24 months after our last contact with you, then deleted.',
          'Client records: for the duration of our relationship and afterwards for as long as tax and company law require (generally five years for financial records).',
          'You can ask us to delete your enquiry at any time; see your rights below.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: ['Under POPIA you may, at any time and free of charge:'],
        bullets: [
          'ask what personal information we hold about you and receive a copy;',
          'ask us to correct or delete it;',
          'object to our processing or withdraw the consent you gave us;',
          'complain to the Information Regulator (South Africa) at inforegulator.org.za if you believe we have handled your information unlawfully.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'The website and API are served over HTTPS only. Enquiry data is stored in an access-controlled database in Google Cloud and can only be read through an authenticated administration interface.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          `Questions and requests go to our Information Officer at ${EMAIL}. Please put "POPIA request" in the subject line so we can prioritise it.`,
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    seoTitle: 'Terms & Conditions — ROGUETECHNOLOGIES',
    seoDescription:
      'Terms for using rogue-tech.co.za and for engaging ROGUETECHNOLOGIES (Pty) Ltd for website, web application and software work.',
    updated: '16 September 2026',
    intro: `These terms cover your use of this website and, together with a written quote, the services ${COMPANY} (registration ${REG}) provides. By using the site or accepting a quote you agree to them.`,
    sections: [
      {
        heading: 'Using this website',
        bullets: [
          'The content is general information about our services. We keep it accurate, but it is not advice and can change without notice.',
          'Package prices are starting points. The price for your project is the one in your written quote, which is valid for 30 days.',
          'You may not misuse the site, attempt to gain unauthorised access to it, or submit forms on behalf of someone else without their permission.',
        ],
      },
      {
        heading: 'Engagements',
        bullets: [
          'Work starts when you accept a written quote. The quote sets out scope, price, payment schedule and timeline.',
          'Changes to scope are agreed in writing before they are built and may change the price and timeline.',
          'Timelines depend on you supplying content, feedback and approvals when they are needed. Delays on either side move the timeline accordingly.',
          'Invoices are payable within the period stated on the quote. We may pause work on overdue accounts.',
        ],
      },
      {
        heading: 'Ownership',
        bullets: [
          'When a project is paid in full, you own the website or application we built for you: the code, designs, content and the domain, hosting and other accounts registered in your name.',
          'We keep ownership of generic tools, libraries and components we owned before the project or that are not specific to you, and you receive a licence to use them as part of your deliverable.',
          'Third-party software, fonts, images and services stay subject to their own licences.',
          'We may show the finished work in our portfolio and case studies unless you ask us in writing not to.',
        ],
      },
      {
        heading: 'Third-party services',
        paragraphs: [
          'Domains, hosting, email, booking tools and similar services are provided by third parties. Unless the quote says otherwise, you contract with those providers directly, their fees are yours, and their terms apply.',
        ],
      },
      {
        heading: 'Your responsibilities',
        bullets: [
          'You are responsible for the content you give us and confirm that you have the right to use it.',
          'You are responsible for keeping your own accounts, passwords and backups secure once we hand over.',
        ],
      },
      {
        heading: 'Liability',
        bullets: [
          'We build carefully and fix defects we are responsible for, but no website or software is guaranteed to be error-free or to produce a particular business result.',
          'To the extent the law allows, our total liability for a project is limited to the fees you paid us for that project, and we are not liable for indirect or consequential loss such as lost profits.',
          'Nothing in these terms limits rights you have under the Consumer Protection Act that cannot be limited.',
        ],
      },
      {
        heading: 'Ending an engagement',
        paragraphs: [
          'Either of us may end an engagement with written notice. You pay for work completed up to that point and receive what has been completed and paid for.',
        ],
      },
      {
        heading: 'Law and contact',
        paragraphs: [
          `South African law applies and the courts of the Western Cape have jurisdiction. Questions about these terms go to ${EMAIL}.`,
        ],
      },
    ],
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    seoTitle: 'Cookie Policy — ROGUETECHNOLOGIES',
    seoDescription:
      'The cookies and browser storage rogue-tech.co.za uses, what they are for and how to control them.',
    updated: '16 September 2026',
    intro:
      'This site uses very little browser storage. This page lists all of it, so you can decide what to allow.',
    sections: [
      {
        heading: 'Storage we set ourselves',
        bullets: [
          'rt_cookie_notice_dismissed — a browser storage flag that remembers you closed the cookie notice, so it does not reappear on every page. It contains no personal information.',
        ],
      },
      {
        heading: 'Analytics cookies',
        paragraphs: [
          'When analytics is enabled, Google Analytics 4 sets the _ga and _ga_* cookies to tell returning visitors from new ones and to measure which pages are used. We do not use Google Signals or advertising features, and analytics never receives your name, email or anything you type into a form.',
        ],
      },
      {
        heading: 'Third-party cookies',
        bullets: [
          'If you reach the booking step after an enquiry, the Cal.com calendar is loaded from cal.com and may set its own cookies under its own policy.',
          'Fonts are loaded from Google Fonts, which does not set cookies.',
        ],
      },
      {
        heading: 'Controlling cookies',
        paragraphs: [
          'You can block or delete cookies in your browser settings; the site keeps working without them. To opt out of Google Analytics everywhere, use the Google Analytics opt-out browser add-on.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`Questions go to ${EMAIL}. Our privacy notice explains how we handle personal information more generally.`],
      },
    ],
  },
];

export function findLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((d) => d.slug === slug);
}
