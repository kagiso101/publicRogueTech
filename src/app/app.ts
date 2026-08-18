import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from './shared/services/analytics.service';
import { CookieNoticeComponent } from './shared/components/cookie-notice/cookie-notice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieNoticeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('publicRogueTech');

  private readonly analytics = inject(AnalyticsService);

  constructor() {
    // No-ops (loads nothing) when environment.gaMeasurementId is empty.
    this.analytics.init();
  }
}
