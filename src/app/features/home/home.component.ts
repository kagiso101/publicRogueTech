import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  Inject,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../shared/services/seo.service';
import { Hero } from './hero/hero';
import { Marquee } from './marquee/marquee';
import { Problem } from './problem/problem';
import { Services } from './services/services';
import { Packages } from './packages/packages';
import { Process } from './process/process';
import { SocialProof } from './social-proof/social-proof';
import { Faq } from './faq/faq';
import { Cta } from './cta/cta';

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
})
export class HomeComponent implements OnInit, AfterViewInit {
  private readonly seo = inject(SeoService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'RogueTech | Web Development & Custom Software, Cape Town',
      description:
        'Websites and custom software for South African businesses. Packages from R8,500 — get online fast with a site that actually brings in customers.',
      path: '/',
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('rt-visible');
        });
      },
      { threshold: 0.1 }
    );
    this.el.nativeElement
      .querySelectorAll('.rt-reveal')
      .forEach((el: Element) => observer.observe(el));
  }
}