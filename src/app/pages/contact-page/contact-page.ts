import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { ConsultationModalService } from '../../shared/services/consultation-modal.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'rt-contact-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly analytics = inject(AnalyticsService);
  private readonly consultationModal = inject(ConsultationModalService);

  readonly email = 'info@rogue-tech.co.za';
  /** Empty until the WhatsApp number is confirmed in environment.ts. */
  readonly whatsappUrl = environment.whatsappNumber
    ? `https://wa.me/${environment.whatsappNumber}`
    : '';

  ngOnInit(): void {
    this.seo.apply({
      title: 'Contact ROGUETECHNOLOGIES — Web Design Cape Town',
      description:
        'Talk to ROGUETECHNOLOGIES about a website, web app or SaaS build. Email us, book a free consultation or get a quote in five quick steps.',
      path: '/contact',
    });
  }

  openConsultation(): void {
    this.consultationModal.open();
  }

  trackContact(method: 'email' | 'whatsapp'): void {
    this.analytics.event('contact_click', { method });
  }
}
