import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component/shell.component';
import { HomeComponent } from './features/home/home.component';
import { ServicesPage } from './pages/services-page/services-page';
import { PricingPage } from './pages/pricing-page/pricing-page';
import { ProcessPage } from './pages/process-page/process-page';
import { FaqPage } from './pages/faq-page/faq-page';
import { GetStartedPage } from './pages/get-started-page/get-started-page';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'RogueTech — Software That Actually Ships',
      },
      {
        path: 'services',
        component: ServicesPage,
        title: 'Services — RogueTech',
      },
      {
        path: 'pricing',
        component: PricingPage,
        title: 'Pricing — RogueTech',
      },
      {
        path: 'process',
        component: ProcessPage,
        title: 'How It Works — RogueTech',
      },
      {
        path: 'faq',
        component: FaqPage,
        title: 'FAQ — RogueTech',

      },
    {
        path: 'get-started',
        component: GetStartedPage,
        title: 'Get Started — RogueTech',
      },
    ],
  },

  // 404 fallback
  // {
  //   path: '**',
  //   loadComponent: () =>
  //     import('./features/not-found/not-found.component').then(
  //       (m) => m.NotFoundComponent
  //     ),
  //   title: '404 — RogueTech',
  // },
];