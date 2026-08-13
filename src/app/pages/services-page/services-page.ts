import {
  Component,
  AfterViewInit,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cta } from '../../features/home/cta/cta';
import { ConsultationModalService } from '../../shared/services/consultation-modal.service';
import { SeoService } from '../../shared/services/seo.service';
import { LeadRequestProjectTypeEnum } from '../../api/model/leadRequest';

interface ServiceOffering {
  num: string;
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  timeline: string;
  startingFrom: string;
  ctaLabel: string;
  ctaLink: string;
  /** When set, the CTA opens the consultation modal (pre-filled) instead of navigating. */
  consultationType?: LeadRequestProjectTypeEnum;
  icon: string;
}

@Component({
  selector: 'rt-services-page',
  standalone: true,
  imports: [RouterLink, Cta],
  templateUrl: './services-page.html',
  styleUrl: './services-page.scss',
})
export class ServicesPage implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private consultationModal: ConsultationModalService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.apply({
      title: 'Web Development Services Cape Town | RogueTech',
      description:
        'Website design, custom web apps, SaaS builds, consulting and care plans. Transparent pricing from R8,500 — see what RogueTech can build for you.',
      path: '/services',
    });
  }

  openConsultation(service: ServiceOffering): void {
    this.consultationModal.open(service.consultationType);
  }

  services: ServiceOffering[] = [
    {
      num: '01',
      eyebrow: 'Marketing & Brochure Sites',
      name: 'Custom Websites',
      tagline:
        'A professional online presence that converts visitors into customers.',
      description:
        'For businesses that need a credible, well-designed website to attract clients and showcase what they do. Built fast, designed for conversion, and fully owned by you.',
      features: [
        'Bespoke design tailored to your brand',
        'Mobile and tablet optimised',
        'On-page SEO setup',
        'Contact and lead capture forms',
        'Analytics integration',
        'Launch support and SSL configuration',
      ],
      bestFor:
        'Salons, plumbers, tutors, consultants, small service businesses',
      timeline: '1–4 weeks',
      startingFrom: 'R8,500',
      ctaLabel: 'View Website Packages',
      ctaLink: '/pricing',
      icon: 'M4 4h16v16H4z M4 8h16 M8 4v4',
    },
    {
      num: '02',
      eyebrow: 'Custom Web Applications',
      name: 'Web Apps',
      tagline:
        'When a website is not enough — bespoke platforms that run your business.',
      description:
        'For businesses with operational complexity. We build custom web applications with backends, databases, admin dashboards, and user accounts. The kind of tooling that turns a website into a workflow.',
      features: [
        'Custom UI/UX from scratch',
        'Backend with database integration',
        'Admin dashboards and CMS',
        'User accounts and role-based access',
        'API integrations with third-party services',
        'Built on modern stack (Angular, Spring Boot, PostgreSQL)',
      ],
      bestFor:
        'Service businesses with workflows, growing brands needing custom tools',
      timeline: '6–10 weeks',
      startingFrom: 'R55,000',
      ctaLabel: 'Discuss a Web App Project',
      ctaLink: '/contact',
      consultationType: LeadRequestProjectTypeEnum.Webapp,
      icon: 'M4 6h16v12H4z M4 10h16 M9 14h6',
    },
    {
      num: '03',
      eyebrow: 'SaaS Platforms',
      name: 'Custom SaaS Development',
      tagline:
        'Multi-tenant platforms built for scale — your product, your IP.',
      description:
        'For founders building software products. We build full SaaS platforms with secure APIs, authentication, payment integration, and the architecture to scale to thousands of users. Same stack we use to build our own products.',
      features: [
        'Multi-tenant architecture',
        'Secure authentication and user management',
        'Payment gateway integration and subscription handling',
        'Public APIs and webhook support',
        'Performance optimisation and scaling strategy',
        'Dedicated technical leadership',
      ],
      bestFor:
        'Founders launching software products, established businesses productising',
      timeline: '3–6 months',
      startingFrom: 'R120,000',
      ctaLabel: 'Book a Strategy Call',
      ctaLink: '/contact',
      consultationType: LeadRequestProjectTypeEnum.Saas,
      icon: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
    },
    {
      num: '04',
      eyebrow: 'Strategy & Advisory',
      name: 'Digital Consulting',
      tagline: 'Get the right answers before writing a line of code.',
      description:
        'For businesses that know they need digital transformation but are not sure where to start. We provide discovery work, technical advisory, architecture planning, and second opinions on existing projects. No build commitment required.',
      features: [
        'Discovery workshops and requirements gathering',
        'Technical architecture planning',
        'Stack and platform recommendations',
        'Project scoping and budget planning',
        'Code reviews and second opinions',
        'Vendor and team evaluation',
      ],
      bestFor:
        'Businesses planning major digital projects, founders pre-build',
      timeline: '1–4 weeks',
      startingFrom: 'Quoted per engagement',
      ctaLabel: 'Book a Consultation',
      ctaLink: '/contact',
      consultationType: LeadRequestProjectTypeEnum.Unsure,
      icon: 'M12 2L3 9l9 7 9-7-9-7z M3 14l9 7 9-7',
    },
    {
      num: '05',
      eyebrow: 'Ongoing Services',
      name: 'Care, Growth & Marketing',
      tagline:
        'Optional monthly services for clients who want continued support.',
      description:
        'After your project launches, you can add any of these services month-to-month. Start, pause, or cancel anytime. None of these are required to receive your project — they are for clients who treat their digital presence as an ongoing growth channel.',
      features: [
        'Care Plan: hosting monitoring, backups, security, minor updates (R450/mo)',
        'SEO Growth: ongoing search optimisation and content (R2,500/mo)',
        'Social Media Management: content and scheduling (from R1,800/mo)',
        'Google Ads Management: full-service paid acquisition (R3,500/mo + spend)',
        'Performance Reporting: structured monthly insights (R650/mo)',
        'Hosting Setup & Migration: one-off (R1,500)',
      ],
      bestFor: 'Any client wanting peace of mind or active growth services',
      timeline: 'Month-to-month',
      startingFrom: 'R450/month',
      ctaLabel: 'Talk About Add-Ons',
      ctaLink: '/contact',
      consultationType: LeadRequestProjectTypeEnum.Unsure,
      icon: 'M12 2v20 M2 12h20 M5 5l14 14 M19 5L5 19',
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