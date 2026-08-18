import { Component, afterNextRender, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

const STORAGE_KEY = 'rt_cookie_notice_dismissed';

/**
 * Small dismissible cookie notice, shown on all pages — but only when
 * analytics is actually configured (gaMeasurementId non-empty). Dismissal
 * persists in localStorage. No privacy-policy link: the site has no
 * privacy-policy route yet.
 */
@Component({
  selector: 'rt-cookie-notice',
  standalone: true,
  imports: [],
  templateUrl: './cookie-notice.html',
  styleUrl: './cookie-notice.scss',
})
export class CookieNoticeComponent {
  readonly visible = signal(false);

  constructor() {
    // afterNextRender only runs in the browser (never during SSR /
    // prerendering) and after hydration, so localStorage is safe to touch
    // and there's no server/client markup mismatch.
    afterNextRender(() => {
      if (!environment.gaMeasurementId) return;
      try {
        if (localStorage.getItem(STORAGE_KEY) === '1') return;
      } catch {
        // Storage unavailable (privacy mode) — show the notice each visit.
      }
      this.visible.set(true);
    });
  }

  dismiss(): void {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage unavailable — dismissal just won't persist.
    }
    this.visible.set(false);
  }
}
