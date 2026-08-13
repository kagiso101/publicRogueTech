import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://rogue-tech.co.za';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export interface SeoConfig {
  /** Under ~60 chars, keyword first. */
  title: string;
  /** Under ~155 chars. */
  description: string;
  /** Route path starting with '/', e.g. '/web-design-table-view'. */
  path: string;
  /** Open Graph type; defaults to 'website'. */
  ogType?: 'website' | 'article';
}

/**
 * Sets per-route head metadata (title, description, canonical, Open Graph).
 * Runs during prerendering too, so every static HTML file carries its own tags.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(config: SeoConfig): void {
    const url = SITE_URL + config.path;

    this.titleService.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: config.ogType ?? 'website' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    this.setCanonical(url);
  }

  /** Insert (or replace) a JSON-LD script by id — e.g. per-suburb Service schema. */
  setJsonLd(id: string, data: object): void {
    let script = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  removeJsonLd(id: string): void {
    this.doc.getElementById(id)?.remove();
  }

  private setCanonical(url: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
