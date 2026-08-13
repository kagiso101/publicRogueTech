import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  services = [
    {
      title: 'Web Design & Development',
      desc: 'From a simple 3-page site to a full custom web application. Responsive, fast, and built to convert.',
      num: '01',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <rect x="6" y="10" width="36" height="28" rx="3"/>
               <line x1="6" y1="18" x2="42" y2="18"/>
               <circle cx="11" cy="14" r="1.5" fill="currentColor"/>
               <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
               <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
             </svg>`,
    },
    {
      title: 'SEO & Google Ads',
      desc: 'Be found when it matters most. We manage your entire search presence — organic rankings and paid campaigns.',
      num: '02',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <circle cx="24" cy="24" r="14"/>
               <path d="M10 24 Q17 16 24 24 Q31 32 38 24"/>
               <line x1="24" y1="10" x2="24" y2="38"/>
             </svg>`,
    },
    {
      title: 'Social Media Management',
      desc: 'Content creation, scheduling and community management across up to 5 platforms. Consistent, on-brand.',
      num: '03',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <rect x="8" y="8" width="14" height="14" rx="2"/>
               <rect x="26" y="8" width="14" height="14" rx="2"/>
               <rect x="8" y="26" width="14" height="14" rx="2"/>
               <rect x="26" y="26" width="14" height="14" rx="2"/>
             </svg>`,
    },
    {
      title: 'Client Project Dashboard',
      desc: 'Log in to app.rogue-tech.co.za and track every milestone. See exactly what we\'re doing, every day.',
      num: '04',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <rect x="6" y="14" width="36" height="24" rx="3"/>
               <path d="M14 22 L22 30 L34 18"/>
             </svg>`,
    },
    {
      title: 'Custom SaaS Platforms',
      desc: 'Enterprise-grade web applications built with Angular, Spring Boot and PostgreSQL. Scalable from day one.',
      num: '05',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <path d="M24 6 L38 16 L38 32 L24 42 L10 32 L10 16 Z"/>
               <path d="M24 14 L32 20 L32 28 L24 34 L16 28 L16 20 Z" stroke-opacity="0.5"/>
             </svg>`,
    },
    {
      title: 'Digital Strategy',
      desc: 'Marketing strategy, competitor analysis, and a clear roadmap. Know exactly where you\'re going and why.',
      num: '06',
      icon: `<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 48 48">
               <path d="M24 8 L40 26 L24 40 L8 26 Z"/>
               <line x1="24" y1="14" x2="24" y2="34"/>
               <line x1="14" y1="26" x2="34" y2="26"/>
             </svg>`,
    },
  ];
}