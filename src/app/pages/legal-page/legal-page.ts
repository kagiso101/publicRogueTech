import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { LegalDocument, findLegalDocument } from './legal-content';

/** One component for /legal/terms, /legal/privacy and /legal/cookies; route data picks the document. */
@Component({
  selector: 'rt-legal-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss',
})
export class LegalPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  doc!: LegalDocument;

  ngOnInit(): void {
    const slug = this.route.snapshot.data['doc'] as string;
    const doc = findLegalDocument(slug);
    if (!doc) {
      throw new Error(`Unknown legal document "${slug}"`);
    }
    this.doc = doc;
    this.seo.apply({
      title: doc.seoTitle,
      description: doc.seoDescription,
      path: `/legal/${doc.slug}`,
    });
  }
}
