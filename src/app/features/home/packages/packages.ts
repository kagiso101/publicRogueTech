import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Package {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  name: string;
  tagline: string;
  price: string;
  priceSub: string;
  features: string[];
  featured: boolean;
  ctaLabel: string;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages {
  packages: Package[] = [
    {
      tier: 'Bronze',
      name: 'Get Me Online',
      tagline: 'For small service businesses',
      price: 'R8,500',
      priceSub: 'Once-off project fee',
      features: [
        '1–3 page responsive website',
        'Template-based custom design',
        'Contact form with email integration',
        'Basic on-page SEO setup',
        'Mobile & tablet optimised',
        'Social page setup (1 platform)',
      ],
      featured: false,
      ctaLabel: 'Get Started',
    },
    {
      tier: 'Silver',
      name: 'Professional Presence',
      tagline: 'For established SMEs',
      price: 'R22,000',
      priceSub: 'Once-off project fee',
      features: [
        '5–7 page custom-designed website',
        'Bespoke design (not template-based)',
        'Improved SEO + Google Analytics',
        'Conversion-focused content structure',
        'Social setup (up to 2 platforms)',
        'Launch support & SSL configuration',
      ],
      featured: true,
      ctaLabel: 'Get Started',
    },
    {
      tier: 'Gold',
      name: 'Business Growth',
      tagline: 'For growing businesses & web apps',
      price: 'R55,000',
      priceSub: 'Once-off project fee',
      features: [
        '10+ pages or full web application',
        'Custom UI/UX from scratch',
        'Backend with database integration',
        'Admin dashboard or CMS',
        'User accounts & role-based access',
        'Advanced SEO foundations',
      ],
      featured: false,
      ctaLabel: 'Get Started',
    },
    {
      tier: 'Platinum',
      name: 'Scale & Dominate',
      tagline: 'For custom SaaS & enterprise',
      price: 'From R120,000',
      priceSub: 'Custom quote',
      features: [
        'Custom web app or SaaS platform',
        'Secure APIs & authentication',
        'Payment integration & subscriptions',
        'CMS or e-commerce functionality',
        'Advanced security & optimisation',
        'Dedicated technical lead',
      ],
      featured: false,
      ctaLabel: 'Book a Strategy Call',
    },
  ];
}