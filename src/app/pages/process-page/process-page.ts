import {
  Component,
  AfterViewInit,
  ElementRef,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cta } from '../../features/home/cta/cta';

interface JourneyPhase {
  num: string;
  group: string;
  title: string;
  description: string;
  highlights: string[];
  duration: string;
  approval: boolean;
}

interface Differentiator {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'rt-process-page',
  standalone: true,
  imports: [Cta],
  templateUrl: './process-page.html',
  styleUrl: './process-page.scss',
})
export class ProcessPage implements AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef
  ) {}

  phases: JourneyPhase[] = [
    {
      num: '01',
      group: 'Pre-Engagement',
      title: 'Discovery & Consultation',
      description:
        'A free conversation to understand your business, goals, and what success looks like. No commitment, no pressure — just an honest assessment of whether we are the right fit.',
      highlights: [
        'Free initial call (30–60 minutes)',
        'Goals, audience, and scope clarified',
        'Honest recommendation on package fit',
      ],
      duration: '30–60 min',
      approval: false,
    },
    {
      num: '02',
      group: 'Pre-Engagement',
      title: 'Proposal & Agreement',
      description:
        'A formal written proposal outlining scope, timeline, deliverables, and total project fee. Once accepted, a service agreement is signed under South African law.',
      highlights: [
        'Fixed scope and pricing — no surprises',
        'Compliant with POPIA, CPA, and ECTA',
        'Reviewed and signed before any payment',
      ],
      duration: '2–5 days',
      approval: true,
    },
    {
      num: '03',
      group: 'Onboarding',
      title: 'Project Kickoff',
      description:
        'A 50% deposit is invoiced to begin work. Once received, you are onboarded into your project space — the home for everything related to your build.',
      highlights: [
        '50% deposit invoiced',
        'Access to your project space',
        'Asset and brand collection begins',
      ],
      duration: '1–2 days',
      approval: false,
    },
    {
      num: '04',
      group: 'Design',
      title: 'Design & Wireframes',
      description:
        'Initial designs and wireframes are presented for your review. This is your chance to shape the direction before any code is written — no surprises later.',
      highlights: [
        'Wireframes for structure and flow',
        'Visual designs aligned to your brand',
        'Two rounds of revisions included',
      ],
      duration: '1–2 weeks',
      approval: true,
    },
    {
      num: '05',
      group: 'Build',
      title: 'Development',
      description:
        'The build phase. Your project comes to life through the project space, where you can review progress at any point. Major milestones require your approval before we move forward.',
      highlights: [
        'Regular progress updates',
        'Milestone-based approvals',
        'Live preview environment',
      ],
      duration: '2–8 weeks',
      approval: true,
    },
    {
      num: '06',
      group: 'Build',
      title: 'Pre-Launch Review',
      description:
        'The site or application is presented for final review. You have a structured opportunity to request adjustments before anything goes live, with full QA across devices and browsers.',
      highlights: [
        'Full QA across devices and browsers',
        'Final adjustment window',
        'Performance and accessibility checks',
      ],
      duration: '3–5 days',
      approval: true,
    },
    {
      num: '07',
      group: 'Launch',
      title: 'Launch',
      description:
        'Deployment to your hosting, DNS configuration, SSL setup, and final go-live QA. The remaining 50% is invoiced. Your project is now live.',
      highlights: [
        'Deployment to your hosting',
        'DNS and SSL configuration',
        'Final 50% invoiced',
      ],
      duration: '1 day',
      approval: false,
    },
    {
      num: '08',
      group: 'Handover',
      title: 'Full Handover',
      description:
        'Documentation, account credentials, and any training required is handed over. From this point, you own the deliverable outright — code, content, and access.',
      highlights: [
        'Full ownership transferred',
        'Documentation and credentials',
        'Training session if needed',
      ],
      duration: '1–2 days',
      approval: false,
    },
    {
      num: '09',
      group: 'Post-Launch',
      title: 'Ongoing Support (Optional)',
      description:
        'You decide what happens next. Subscribe to a Care Plan for monthly support and updates, add growth services like SEO or social management, or simply own your project outright with no further commitment.',
      highlights: [
        'Care Plan: monitoring, backups, updates',
        'Growth add-ons: SEO, social, ads',
        'Or no commitment — fully optional',
      ],
      duration: 'Your choice',
      approval: false,
    },
  ];

  differentiators: Differentiator[] = [
    {
      icon: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z M12 9a3 3 0 100 6 3 3 0 000-6z',
      title: 'No Black Holes',
      description:
        'You see exactly what is happening at every stage. Your project space gives you live visibility into progress, decisions, and what needs your input — so you are never wondering where things stand.',
    },
    {
      icon: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z',
      title: 'You Own Everything',
      description:
        'Code, content, domain, hosting accounts — all yours from day one. We hold no part of your business hostage. If you ever want to take your project elsewhere, you take everything with you, no friction.',
    },
    {
      icon: 'M20 6L9 17l-5-5 M22 4v6h-6',
      title: 'Compliance Built-In',
      description:
        'Every engagement operates under South African law and is compliant with POPIA, CPA, and ECTA. You receive a formal service agreement before any work begins — not a verbal handshake.',
    },
  ];

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