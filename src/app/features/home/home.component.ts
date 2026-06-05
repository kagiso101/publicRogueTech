import {
  Component,
  AfterViewInit,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class HomeComponent implements AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) {}

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