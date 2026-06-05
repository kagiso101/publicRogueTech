import { AfterViewInit, Component, ElementRef, OnDestroy, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LeadsFacade } from '../../../../store/leads/leads.facade';

@Component({
  selector: 'rt-calendar-booking',
  standalone: true,
  imports: [],
  templateUrl: './calendar-booking.html',
  styleUrl: './calendar-booking.scss',
})
export class CalendarBookingComponent implements AfterViewInit, OnDestroy {
  private readonly router = inject(Router);
  readonly facade = inject(LeadsFacade);

  // Cal.com namespace + link
  // TODO: replace 'roguetech/strategy-call' with your actual Cal.com handle
  readonly calNamespace = 'strategy-call';
  readonly calLink = 'roguetech/strategy-call';

  readonly embedContainer = viewChild<ElementRef<HTMLDivElement>>('calEmbed');

  ngAfterViewInit(): void {
    this.initCalEmbed();
  }

  ngOnDestroy(): void {
    // Defensive: remove the global Cal instance when navigating away
    const w = window as any;
    if (w.Cal?.ns?.[this.calNamespace]) {
      delete w.Cal.ns[this.calNamespace];
    }
  }

  goHome(): void {
    this.facade.resetWizard();
    this.router.navigate(['/']);
  }

  private initCalEmbed(): void {
    const container = this.embedContainer()?.nativeElement;
    if (!container) return;

    // Load Cal.com embed script once
    this.loadCalScript(() => {
      const w = window as any;
      const Cal = w.Cal;
      if (!Cal) return;

      // Initialize the namespace
      Cal('init', this.calNamespace, { origin: 'https://cal.com' });

      // Inline embed inside our container
      Cal.ns[this.calNamespace]('inline', {
        elementOrSelector: container,
        calLink: this.calLink,
        layout: 'month_view',
        config: {
          // Pre-fill from facade
          name: this.facade.contact().fullName,
          email: this.facade.contact().email,
          notes: `Lead ID: ${this.facade.submission()?.id ?? 'unknown'}`,
        },
      });

      // Apply dark-theme + brand color styling to the embed
      Cal.ns[this.calNamespace]('ui', {
        theme: 'dark',
        cssVarsPerTheme: {
          dark: {
            'cal-brand': '#CC0000',
            'cal-text': '#F0F0F0',
            'cal-text-emphasis': '#FFFFFF',
            'cal-text-muted': '#888888',
            'cal-bg': '#0F0F0F',
            'cal-bg-emphasis': '#141414',
            'cal-border': 'rgba(255, 255, 255, 0.08)',
            'cal-border-emphasis': 'rgba(204, 0, 0, 0.4)',
          },
        },
        hideEventTypeDetails: false,
      });
    });
  }

  private loadCalScript(onReady: () => void): void {
    const w = window as any;
    if (w.Cal) {
      onReady();
      return;
    }

    // Official Cal.com embed loader
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window as any, 'https://app.cal.com/embed/embed.js', 'init');

    // Wait one tick for the loader to attach
    setTimeout(onReady, 100);
  }
}