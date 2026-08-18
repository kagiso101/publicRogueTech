import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'rt-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year = new Date().getFullYear();
  isVisible = false;

  private readonly analytics = inject(AnalyticsService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  trackContact(method: 'email' | 'whatsapp'): void {
    this.analytics.event('contact_click', { method });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll(): void {
    this.isVisible = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}