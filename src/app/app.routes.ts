import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component/shell.component';
import { HomeComponent } from './features/home/home.component';

// Page titles/descriptions/canonicals are owned by SeoService inside each
// routed component (kept there so they stay in sync with the OG tags).
// Every page except the home page is lazy-loaded so the initial bundle only
// carries what the landing page needs.
export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'services',
        loadComponent: () => import('./pages/services-page/services-page').then((m) => m.ServicesPage),
      },
      {
        path: 'pricing',
        loadComponent: () => import('./pages/pricing-page/pricing-page').then((m) => m.PricingPage),
      },
      {
        path: 'process',
        loadComponent: () => import('./pages/process-page/process-page').then((m) => m.ProcessPage),
      },
      {
        path: 'faq',
        loadComponent: () => import('./pages/faq-page/faq-page').then((m) => m.FaqPage),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact-page/contact-page').then((m) => m.ContactPage),
      },
      {
        path: 'get-started',
        loadComponent: () => import('./pages/get-started-page/get-started-page').then((m) => m.GetStartedPage),
      },
      // ─── Local SEO landing pages (content in suburb-content.ts) ───
      {
        path: 'web-design-table-view',
        loadComponent: () => import('./pages/suburb-page/suburb-page').then((m) => m.SuburbPage),
        data: { suburb: 'table-view' },
      },
      {
        path: 'web-design-parklands',
        loadComponent: () => import('./pages/suburb-page/suburb-page').then((m) => m.SuburbPage),
        data: { suburb: 'parklands' },
      },
      {
        path: 'web-design-bloubergstrand',
        loadComponent: () => import('./pages/suburb-page/suburb-page').then((m) => m.SuburbPage),
        data: { suburb: 'bloubergstrand' },
      },
      {
        path: 'web-design-milnerton',
        loadComponent: () => import('./pages/suburb-page/suburb-page').then((m) => m.SuburbPage),
        data: { suburb: 'milnerton' },
      },
      {
        path: 'web-design-sunningdale',
        loadComponent: () => import('./pages/suburb-page/suburb-page').then((m) => m.SuburbPage),
        data: { suburb: 'sunningdale' },
      },
      {
        path: 'website-design-prices-cape-town',
        loadComponent: () =>
          import('./pages/pricing-article-page/pricing-article-page').then((m) => m.PricingArticlePage),
      },
      // ─── Industry pages (content in industry-content.ts) ───
      {
        path: 'websites-for-salons',
        loadComponent: () => import('./pages/industry-page/industry-page').then((m) => m.IndustryPage),
        data: { industry: 'websites-for-salons' },
      },
      {
        path: 'websites-for-wellness',
        loadComponent: () => import('./pages/industry-page/industry-page').then((m) => m.IndustryPage),
        data: { industry: 'websites-for-wellness' },
      },
      {
        path: 'booking-websites',
        loadComponent: () => import('./pages/industry-page/industry-page').then((m) => m.IndustryPage),
        data: { industry: 'booking-websites' },
      },
      // ─── Legal (content in legal-content.ts) ───
      {
        path: 'legal/terms',
        loadComponent: () => import('./pages/legal-page/legal-page').then((m) => m.LegalPage),
        data: { doc: 'terms' },
      },
      {
        path: 'legal/privacy',
        loadComponent: () => import('./pages/legal-page/legal-page').then((m) => m.LegalPage),
        data: { doc: 'privacy' },
      },
      {
        path: 'legal/cookies',
        loadComponent: () => import('./pages/legal-page/legal-page').then((m) => m.LegalPage),
        data: { doc: 'cookies' },
      },
      // ─── Anything else (in-app navigation only; hard loads get Netlify's 404.html) ───
      {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page').then((m) => m.NotFoundPage),
      },
    ],
  },
];
