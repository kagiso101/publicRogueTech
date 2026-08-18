import { Component, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cta } from '../../features/home/cta/cta';
import { SeoService, SITE_URL } from '../../shared/services/seo.service';
import { INDUSTRIES, IndustryContent, getIndustry } from './industry-content';

const JSON_LD_ID = 'industry-faq-schema';

@Component({
  selector: 'rt-industry-page',
  standalone: true,
  imports: [RouterLink, Cta],
  templateUrl: './industry-page.html',
  styleUrl: './industry-page.scss',
})
export class IndustryPage implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly industry = signal<IndustryContent | null>(null);
  readonly otherIndustries = signal<IndustryContent[]>([]);

  constructor() {
    this.route.data.pipe(takeUntilDestroyed()).subscribe((data) => {
      const content = getIndustry(data['industry']);
      if (!content) return;
      this.industry.set(content);
      this.otherIndustries.set(INDUSTRIES.filter((i) => i.slug !== content.slug));
      this.applySeo(content);
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd(JSON_LD_ID);
  }

  private applySeo(content: IndustryContent): void {
    this.seo.apply({
      title: content.seoTitle,
      description: content.seoDescription,
      path: `/${content.slug}`,
    });
    this.seo.setJsonLd(JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }
}
