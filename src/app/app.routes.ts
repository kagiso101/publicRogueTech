import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component/shell.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesPage } from './pages/services-page/services-page';
import { PricingPage } from './pages/pricing-page/pricing-page';
import { ProcessPage } from './pages/process-page/process-page';
import { FaqPage } from './pages/faq-page/faq-page';
import { GetStartedPage } from './pages/get-started-page/get-started-page';
import { SuburbPage } from './pages/suburb-page/suburb-page';
import { PricingArticlePage } from './pages/pricing-article-page/pricing-article-page';

// Page titles/descriptions/canonicals are owned by SeoService inside each
// routed component (kept there so they stay in sync with the OG tags).
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
        component: ServicesPage,
      },
      {
        path: 'pricing',
        component: PricingPage,
      },
      {
        path: 'process',
        component: ProcessPage,
      },
      {
        path: 'faq',
        component: FaqPage,
      },
      {
        path: 'get-started',
        component: GetStartedPage,
      },
      // ─── Local SEO landing pages (content in suburb-content.ts) ───
      {
        path: 'web-design-table-view',
        component: SuburbPage,
        data: { suburb: 'table-view' },
      },
      {
        path: 'web-design-parklands',
        component: SuburbPage,
        data: { suburb: 'parklands' },
      },
      {
        path: 'web-design-bloubergstrand',
        component: SuburbPage,
        data: { suburb: 'bloubergstrand' },
      },
      {
        path: 'web-design-milnerton',
        component: SuburbPage,
        data: { suburb: 'milnerton' },
      },
      {
        path: 'web-design-sunningdale',
        component: SuburbPage,
        data: { suburb: 'sunningdale' },
      },
      {
        path: 'website-design-prices-cape-town',
        component: PricingArticlePage,
      },
    ],
  },
];
