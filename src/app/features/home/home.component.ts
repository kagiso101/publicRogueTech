import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Hero } from './hero/hero';
import { Marquee } from './marquee/marquee';
import { Problem } from './problem/problem';
import { Services } from './services/services';
import { Packages } from './packages/packages';
import { Process } from './process/process';
import { SocialProof } from './social-proof/social-proof';
import { Faq } from './faq/faq';
import { Cta } from '../../shared/components/cta/cta';

@Component({
  selector: 'rt-home',
  standalone: true,
  imports: [
    Hero,
    Marquee,
    Problem,
    Services,
    Packages,
    Process,
    SocialProof,
    Faq,
    Cta,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  hostDirectives: [ScrollRevealDirective],
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Web Design & Custom Software, Cape Town — ROGUETECHNOLOGIES',
      description:
        'Websites and custom software for South African businesses. Packages from R8,500 — get online fast with a site that actually brings in customers.',
      path: '/',
    });
  }
}
