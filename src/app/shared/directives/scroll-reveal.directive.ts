import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fades in every `.rt-reveal` descendant as it scrolls into view by adding
 * `.rt-visible` (see styles/_animations.scss).
 *
 * Attach via `hostDirectives: [ScrollRevealDirective]` on a page or section
 * component. Elements rendered later (conditional sections, filtered lists)
 * are picked up automatically, so no component needs its own observer.
 */
@Directive({
  selector: '[rtScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  private intersection?: IntersectionObserver;
  private mutation?: MutationObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('rt-visible');
          this.intersection?.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    this.observePending();
    this.mutation = new MutationObserver(() => this.observePending());
    this.mutation.observe(this.host.nativeElement, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.intersection?.disconnect();
    this.mutation?.disconnect();
  }

  private observePending(): void {
    this.host.nativeElement
      .querySelectorAll('.rt-reveal:not(.rt-visible)')
      .forEach((el) => this.intersection?.observe(el));
  }
}
