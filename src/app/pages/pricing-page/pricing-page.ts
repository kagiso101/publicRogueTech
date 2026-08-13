import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  Inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cta } from '../../features/home/cta/cta';
import { Packages } from '../../features/home/packages/packages';
import { SeoService } from '../../shared/services/seo.service';


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

interface PricingFaq {
  q: string;
  a: string;
}

@Component({
  selector: 'rt-pricing-page',
  standalone: true,
  imports: [Packages, Cta],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.scss',
})
export class PricingPage implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'Web Design Packages & Prices | RogueTech',
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

  // ─── PRICING-SPECIFIC FAQ ───
  pricingFaqs: PricingFaq[] = [
    {
      q: 'Why is the project a one-off fee instead of a subscription?',
      a: 'Because you should own what you pay for. Subscription website packages lock clients into ongoing commitments for work that has already been delivered. We build it, you own it, and any ongoing services are entirely your choice.',
    },
    {
      q: 'Are there any hidden costs?',
      a: 'No. The project fee covers the full build as scoped. Domain and hosting are paid by you directly to your providers (we advise on selection and handle setup). Add-ons are clearly priced and never required. Any change in scope is quoted before any work happens.',
    },
    {
      q: 'When do I pay?',
      a: 'A 50% deposit is invoiced at project kickoff to begin work. The remaining 50% is invoiced at launch. For Platinum and larger projects, payment is structured around milestones — discussed during the proposal phase.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'EFT bank transfer to a South African business account. For international clients, wire transfer in USD or EUR. All invoices include 15% VAT where applicable.',
    },
    {
      q: 'Can I start small and upgrade later?',
      a: 'Yes. Many clients begin with Bronze or Silver and grow into Gold as their business expands. We credit work already delivered so you only pay the difference plus any new scope.',
    },
    {
      q: 'What happens if I want to cancel mid-project?',
      a: 'You can stop a project at any point. You pay only for the work completed up to that point and you receive everything we have built so far. We do not lock you into completing a project you no longer want.',
    },
    {
      q: 'Do prices include VAT?',
      a: 'All prices listed are exclusive of VAT. Standard South African VAT (15%) is added to the final invoice where applicable.',
    },
  ];

  // ─── LIFECYCLE ───
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('rt-visible');
        });
      },
      { threshold: 0.1 }
    );
    this.el.nativeElement
      .querySelectorAll('.rt-reveal')
      .forEach((el: Element) => observer.observe(el));
  }
}