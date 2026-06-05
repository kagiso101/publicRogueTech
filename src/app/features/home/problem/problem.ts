import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [],
  templateUrl: './problem.html',
  styleUrl: './problem.scss',
})
export class Problem implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) { }

  problems = [
    {
      num: '01',
      title: 'No online presence',
      desc: 'Customers search Google every day. If you\'re not there, your competitor gets the sale — every single time.',
    },
    {
      num: '02',
      title: 'No time to manage it',
      desc: 'You\'re running a business. You don\'t have time to learn SEO, manage ads, or build a website from scratch.',
    },
    {
      num: '03',
      title: 'No visibility into progress',
      desc: 'You\'ve paid agencies before and had no idea what they were doing. Your money disappeared with no results.',
    },
  ];

  stats = [
    {
      value: 72,
      label: 'of SA micro-enterprises operate with no formal digital presence',
      suffix: '%',
      source: 'FinScope MSME 2024'
    },
    {
      value: 66,
      label: 'of SA small businesses fail within their first 5 years',
      suffix: '%',
      source: 'UNCTAD 2024'
    },
    {
      value: 72,
      label: 'of SA online purchases happen on mobile — is your site ready?',
      suffix: '%',
      source: 'FedEx / Statista 2024'
    },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animateCircles();
    this.animateCounters();
  }

  private animateCircles(): void {
    const circles = this.el.nativeElement.querySelectorAll('.stat-ring-progress');
    circles.forEach((circle: SVGCircleElement, i: number) => {
      const target = this.stats[i].value;
      const radius = parseFloat(circle.getAttribute('r') || '54');
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      setTimeout(() => {
        const offset = circumference - (target / 100) * circumference;
        circle.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
        circle.style.strokeDashoffset = `${offset}`;
      }, i * 200 + 400);
    });
  }

  private animateCounters(): void {
    const counters = this.el.nativeElement.querySelectorAll('.stat-counter');
    counters.forEach((counter: HTMLElement, i: number) => {
      const target = this.stats[i].value;
      setTimeout(() => {
        let current = 0;
        const step = target / 80;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = String(target);
            clearInterval(timer);
            return;
          }
          counter.textContent = String(Math.floor(current));
        }, 16);
      }, i * 200 + 400);
    });
  }
}