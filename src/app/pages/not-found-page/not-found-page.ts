import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';

/** Wildcard route target. Hard loads of unknown URLs are served by Netlify's 404.html instead. */
@Component({
  selector: 'rt-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Page Not Found — ROGUETECHNOLOGIES',
      description: 'That page does not exist. Find our services, pricing and contact details from here.',
      path: '/404',
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
  }

  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
