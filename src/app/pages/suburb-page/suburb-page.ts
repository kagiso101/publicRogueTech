import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cta } from '../../features/home/cta/cta';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { SeoService, SITE_URL } from '../../shared/services/seo.service';
import { SUBURBS, SuburbContent, getSuburb } from './suburb-content';

interface SuburbPackage {
  tier: string;
  price: string;
  name: string;
  audience: string;
}

const JSON_LD_ID = 'suburb-service-schema';

@Component({
  selector: 'rt-suburb-page',
  standalone: true,
  imports: [RouterLink, Cta],
  templateUrl: './suburb-page.html',
  styleUrl: './suburb-page.scss',
})
export class SuburbPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);

  readonly suburb = signal<SuburbContent | null>(null);
  readonly otherSuburbs = signal<SuburbContent[]>([]);

  readonly packages: SuburbPackage[] = [
    {
      tier: 'Bronze',
      price: 'R8,500',
      name: 'Starter Website',
      audience: 'A professional 1–3 page site for the business that needs to be online and findable, fast.',
    },
    {
      tier: 'Silver',
      price: 'R22,000',
      name: 'Business Website',
      audience: 'A full multi-page site with booking, galleries or content management for the established business.',
    },
    {
      tier: 'Gold',
      price: 'R55,000',
      name: 'Custom Web App',
      audience: 'Custom functionality — portals, dashboards, quoting tools — built around how your business works.',
    },
    {
      tier: 'Platinum',
      price: 'from R120,000',
      name: 'SaaS Product Build',
      audience: 'A production SaaS product taken from validation to launch, for founders with bigger plans.',
    },
  ];

  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const content = getSuburb(data['suburb']);
      if (!content) return;
      this.suburb.set(content);
      this.otherSuburbs.set(SUBURBS.filter((s) => s.slug !== content.slug));
      this.applySeo(content);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.seo.removeJsonLd(JSON_LD_ID);
  }

  trackContact(method: 'email' | 'whatsapp'): void {
    this.analytics.event('contact_click', { method });
  }

  private applySeo(content: SuburbContent): void {
    const path = `/web-design-${content.slug}`;
    this.seo.apply({
      title: content.seoTitle,
      description: content.seoDescription,
      path,
    });
    this.seo.setJsonLd(JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Website design and development',
      name: `Website Design in ${content.name}`,
      url: `${SITE_URL}${path}`,
      provider: {
        '@type': 'ProfessionalService',
        name: 'ROGUETECHNOLOGIES (Pty) Ltd',
        alternateName: 'RogueTech',
        url: `${SITE_URL}/`,
        email: 'info@rogue-tech.co.za',
      },
      areaServed: {
        '@type': 'Place',
        name: `${content.name}, Cape Town, South Africa`,
      },
      offers: this.packages.map((p) => ({
        '@type': 'Offer',
        name: `${p.tier} — ${p.name}`,
        priceCurrency: 'ZAR',
        price: p.price.replace(/[^\d]/g, ''),
      })),
    });
  }
}
