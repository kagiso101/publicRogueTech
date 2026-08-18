import { DOCUMENT, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Thin wrapper around Google Analytics 4 (gtag.js — loaded directly, no
 * Google Tag Manager). Entirely inert unless `environment.gaMeasurementId`
 * is set AND we're running in a browser: with an empty ID (dev, or prod
 * before launch) no script is injected and every method no-ops silently.
 *
 * GA4 doesn't see SPA route changes by itself, so automatic page views are
 * disabled (`send_page_view: false`) and a manual `page_view` is fired on
 * every Router NavigationEnd instead.
 *
 * PRIVACY: never send personal information through this service — no names,
 * emails, or phone numbers. Page paths and anonymous event names only.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  private enabled = false;

  /** Called once from the root App component. */
  init(): void {
    const id = environment.gaMeasurementId;
    if (!id || !isPlatformBrowser(this.platformId)) return;

    // Async gtag.js loader — equivalent of Google's copy-paste snippet.
    const script = this.doc.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    this.doc.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    // Must be a classic function pushing `arguments` (not a rest array) —
    // gtag.js expects the Arguments object, exactly like Google's snippet.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false });
    this.enabled = true;

    // Manual SPA page views (covers the initial navigation too, since we
    // subscribe before it completes).
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        window.gtag!('event', 'page_view', {
          page_location: this.doc.location.href,
          page_path: e.urlAfterRedirects,
        });
      });
  }

  /** Fire a custom event. No-ops when analytics is unconfigured. */
  event(name: string, params?: Record<string, string>): void {
    if (!this.enabled) return;
    window.gtag?.('event', name, params);
  }
}
