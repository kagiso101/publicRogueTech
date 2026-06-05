import { Component } from '@angular/core';

interface Testimonial {
  quote: string;
  highlight: string;
  quoteEnd: string;
  initials: string;
  name: string;
  role: string;
}

interface Partner {
  tag: string;
  logo: string;
  description: string;
  badge: string;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [],
  templateUrl: './social-proof.html',
  styleUrl: './social-proof.scss',
})
export class SocialProof {
  testimonial: Testimonial = {
    quote: 'Finally an agency that shows me',
    highlight: 'exactly what they\'re doing',
    quoteEnd: '— no more black holes.',
    initials: 'TM',
    name: 'Thembi Molaba',
    role: 'Small Business Owner, Johannesburg',
  };

  partner: Partner = {
    tag: 'Official Partner',
    logo: 'CLOUDPARK\nMEDIA',
    description:
      'RogueTech and CloudPark Media have partnered to offer clients a complete advertising and technology solution — from LED billboards to custom websites.',
    badge: 'Verified Partnership — January 2026',
  };
}