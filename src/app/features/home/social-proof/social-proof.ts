import { Component } from '@angular/core';

/**
 * Real, showable proof only (site honesty rule): a delivered project, and the
 * commitments the rest of the site already makes. No quotes without consent,
 * no partnerships that cannot be shown.
 */
interface CaseStudy {
  client: string;
  url: string;
  urlLabel: string;
  summary: string;
  deliverables: string[];
}

interface Commitment {
  title: string;
  detail: string;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  templateUrl: './social-proof.html',
  styleUrl: './social-proof.scss',
})
export class SocialProof {
  caseStudy: CaseStudy = {
    client: 'Bruja Thembi',
    url: 'https://brujathembi.com',
    urlLabel: 'brujathembi.com',
    summary:
      'A booking-led site for a practitioner who takes appointments: visitors read, pick a slot and book without a back-and-forth.',
    deliverables: [
      'Custom-designed website, mobile first',
      'Online bookings through Cal.com',
      'Custom domain and branded email',
      'Everything in the client\'s name',
    ],
  };

  commitments: Commitment[] = [
    {
      title: '100% client ownership',
      detail: 'Your domain, your code, your content. We build and maintain it; you own it outright.',
    },
    {
      title: 'Fixed-price packages from R8,500',
      detail: 'Four packages with the scope written down before work starts. No surprise invoices.',
    },
    {
      title: 'Progress you can see',
      detail: 'Weekly demos and written updates while we build, so you always know where things stand.',
    },
  ];
}
