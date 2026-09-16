import { Component, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cta } from '../../shared/components/cta/cta';
import { SeoService } from '../../shared/services/seo.service';
import { ConsultationModalService } from '../../shared/services/consultation-modal.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import {
  FAQS,
  FAQ_CATEGORIES,
  FEATURED_FAQS,
  FaqItem,
} from '../../shared/content/faq-content';

const FAQ_JSON_LD_ID = 'faq-page-schema';

@Component({
  selector: 'rt-faq-page',
  standalone: true,
  imports: [FormsModule, Cta],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.scss',
  hostDirectives: [ScrollRevealDirective],
})
export class FaqPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly consultationModal = inject(ConsultationModalService);

  readonly categories = FAQ_CATEGORIES;
  readonly faqs = FAQS;

  ngOnInit(): void {
    this.seo.apply({
      title: 'Web Design FAQ, Cape Town — ROGUETECHNOLOGIES',
      description:
        'Answers on pricing, timelines, ownership, hosting and support for websites and web apps built by ROGUETECHNOLOGIES in Cape Town.',
      path: '/faq',
    });
    this.seo.setJsonLd(FAQ_JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd(FAQ_JSON_LD_ID);
  }

  searchQuery = signal('');
  activeCategory = signal<string>('all');
  openFaqId = signal<string | null>(null);

  // ─── COMPUTED ───
  readonly featuredFaqs = FEATURED_FAQS;

  filteredFaqs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.activeCategory();

    return this.faqs.filter((f) => {
      const matchesCategory = cat === 'all' || f.category === cat;
      const matchesQuery =
        !query ||
        f.q.toLowerCase().includes(query) ||
        f.a.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  groupedFaqs = computed(() => {
    const filtered = this.filteredFaqs();
    return this.categories
      .map((cat) => ({
        category: cat,
        items: filtered.filter((f) => f.category === cat.id),
      }))
      .filter((g) => g.items.length > 0);
  });

  // ─── COUNTS ───
  countFor(categoryId: string): number {
    return this.faqs.filter((f) => f.category === categoryId).length;
  }

  totalCount = computed(() => this.faqs.length);

  resultCount = computed(() => this.filteredFaqs().length);

  hasResults = computed(() => this.resultCount() > 0);

  // ─── ACTIONS ───
  setCategory(id: string): void {
    this.activeCategory.set(id);
    this.openFaqId.set(null);
  }

  toggleFaq(id: string): void {
    this.openFaqId.update((current) => (current === id ? null : id));
  }

  askDirectly(): void {
    this.consultationModal.open();
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.activeCategory.set('all');
  }

  faqId(faq: FaqItem): string {
    return `${faq.category}-${faq.q.slice(0, 20)}`;
  }
}
