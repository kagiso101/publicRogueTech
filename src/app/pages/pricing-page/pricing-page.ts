import { Component, OnInit, inject, signal } from '@angular/core';
import { Cta } from '../../shared/components/cta/cta';
import { Packages } from '../../features/home/packages/packages';
import { SeoService } from '../../shared/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { faqsFor } from '../../shared/content/faq-content';

interface AddOn {
  name: string;
  price: string;
  cadence: string;
  description: string;
  category: 'monthly' | 'oneoff';
  recommended?: boolean;
}

interface ComparisonRow {
  feature: string;
  bronze: string | boolean;
  silver: string | boolean;
  gold: string | boolean;
  platinum: string | boolean;
}

@Component({
  selector: 'rt-pricing-page',
  standalone: true,
  imports: [Packages, Cta],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.scss',
  hostDirectives: [ScrollRevealDirective],
})
export class PricingPage implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Website Design Prices Cape Town — Packages from R8,500',
      description:
        'Four transparent packages: Bronze R8,500, Silver R22,000, Gold R55,000, Platinum from R120,000. No hidden costs — see exactly what each tier includes.',
      path: '/pricing',
    });
  }

  comparisonOpen = signal(false);
  openFaqIndex = signal<number | null>(null);

  toggleComparison(): void {
    this.comparisonOpen.update((v) => !v);
  }

  toggleFaq(index: number): void {
    this.openFaqIndex.update((current) => (current === index ? null : index));
  }

  // ─── ADD-ONS ───
  addOns: AddOn[] = [
    {
      name: 'Care Plan',
      price: 'R450',
      cadence: 'per month',
      description:
        'Hosting monitoring, regular backups, security updates, and a monthly allowance for minor content updates. Recommended on every project for peace of mind.',
      category: 'monthly',
      recommended: true,
    },
    {
      name: 'SEO Growth',
      price: 'R2,500',
      cadence: 'per month',
      description:
        'Ongoing search engine optimisation — keyword research, on-page improvements, content recommendations, technical SEO, and monthly progress tracking.',
      category: 'monthly',
    },
    {
      name: 'Social Media Management',
      price: 'From R1,800',
      cadence: 'per month',
      description:
        'Content creation and scheduling across your social platforms. Pricing scales with platform count and posting cadence.',
      category: 'monthly',
    },
    {
      name: 'Google Ads Management',
      price: 'R3,500',
      cadence: 'per month + ad spend',
      description:
        'Full-service paid search and display advertising — campaign setup, audience targeting, ad creative, ongoing optimisation, and reporting. Ad spend paid by you directly to Google.',
      category: 'monthly',
    },
    {
      name: 'Performance Reporting',
      price: 'R650',
      cadence: 'per month',
      description:
        'A monthly report covering site performance, traffic sources, user behaviour, and conversion metrics. For clients who want visibility without commissioning full analytics work.',
      category: 'monthly',
    },
    {
      name: 'Hosting Setup & Migration',
      price: 'R1,500',
      cadence: 'one-off',
      description:
        'We research the right hosting provider for your project, register the account on your behalf, configure all technical settings, and hand over full account access.',
      category: 'oneoff',
    },
  ];

  get monthlyAddOns(): AddOn[] {
    return this.addOns.filter((a) => a.category === 'monthly');
  }

  get oneOffAddOns(): AddOn[] {
    return this.addOns.filter((a) => a.category === 'oneoff');
  }

  // ─── COMPARISON TABLE ───
  comparisonRows: ComparisonRow[] = [
    {
      feature: 'Project pages',
      bronze: '1–3 pages',
      silver: '5–7 pages',
      gold: '10+ pages',
      platinum: 'Custom scope',
    },
    {
      feature: 'Design approach',
      bronze: 'Template-based',
      silver: 'Bespoke design',
      gold: 'Custom UI/UX',
      platinum: 'Full product design',
    },
    {
      feature: 'Backend & database',
      bronze: false,
      silver: false,
      gold: true,
      platinum: true,
    },
    {
      feature: 'Admin dashboard / CMS',
      bronze: false,
      silver: false,
      gold: true,
      platinum: true,
    },
    {
      feature: 'User accounts & auth',
      bronze: false,
      silver: false,
      gold: 'Optional',
      platinum: true,
    },
    {
      feature: 'Payment integration',
      bronze: false,
      silver: false,
      gold: 'Optional',
      platinum: true,
    },
    {
      feature: 'Public APIs',
      bronze: false,
      silver: false,
      gold: false,
      platinum: true,
    },
    {
      feature: 'SEO setup',
      bronze: 'Basic',
      silver: 'Improved',
      gold: 'Advanced',
      platinum: 'Advanced',
    },
    {
      feature: 'Analytics integration',
      bronze: false,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      feature: 'Social setup',
      bronze: '1 platform',
      silver: '2 platforms',
      gold: 'Add-on',
      platinum: 'Add-on',
    },
    {
      feature: 'Dedicated technical lead',
      bronze: false,
      silver: false,
      gold: false,
      platinum: true,
    },
    {
      feature: 'Typical timeline',
      bronze: '1–2 weeks',
      silver: '3–4 weeks',
      gold: '6–10 weeks',
      platinum: '3–6 months',
    },
    {
      feature: 'Project fee',
      bronze: 'R8,500',
      silver: 'R22,000',
      gold: 'R55,000',
      platinum: 'From R120,000',
    },
  ];

  // ─── EXCLUSIONS ───
  exclusions: string[] = [
    'Domain registration and renewal',
    'Web hosting fees',
    'Paid plugins, themes, or third-party software licences',
    'Stock photography or premium imagery',
    'Third-party API costs (e.g. SMS gateways, payment processor fees)',
    'Email hosting or transactional email services',
    'Advertising spend on platforms like Google Ads, Meta, LinkedIn',
  ];

  // ─── PRICING FAQ (from the shared catalogue) ───
  readonly pricingFaqs = faqsFor('pricing');
}
