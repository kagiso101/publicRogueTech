import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component/shell.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesPage } from './pages/services-page/services-page';
import { PricingPage } from './pages/pricing-page/pricing-page';
import { ProcessPage } from './pages/process-page/process-page';
import { FaqPage } from './pages/faq-page/faq-page';
import { GetStartedPage } from './pages/get-started-page/get-started-page';

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
    ],
  },
];
