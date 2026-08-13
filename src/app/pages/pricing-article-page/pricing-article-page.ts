import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cta } from '../../features/home/cta/cta';
import { SeoService, SITE_URL } from '../../shared/services/seo.service';

interface ArticleFaq {
  q: string;
  a: string;
}

const JSON_LD_ID = 'pricing-article-faq-schema';

@Component({
  selector: 'rt-pricing-article-page',
  standalone: true,
  imports: [RouterLink, Cta],
  templateUrl: './pricing-article-page.html',
  styleUrl: './pricing-article-page.scss',
})
export class PricingArticlePage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  readonly faqs: ArticleFaq[] = [
    {
      q: 'How much does a 5-page website cost in Cape Town?',
      a: 'Realistically R8,500 to R25,000 for professional custom work. Below that you are usually buying a template with your logo dropped in; above that you are usually paying agency overheads. At RogueTech a 5-page site falls between our Bronze (R8,500) and Silver (R22,000) packages depending on features like booking or content management.',
    },
    {
      q: 'Do I pay monthly for my website?',
      a: 'Not for the build — our packages are once-off and you own the result. The only recurring costs are hosting and your domain (yours, in your name), and an optional care plan from R450/month if you want us to handle updates, backups and changes for you.',
    },
    {
      q: 'Who owns the website once it is built?',
      a: 'You do — domain, code, content and design, all registered and delivered in your name. This matters: with most subscription website services, cancelling your R499/month plan means your website disappears. That never happens with a site you own.',
    },
    {
      q: 'How long does a website take to build?',
      a: 'A Bronze starter site is typically live inside two weeks. A Silver business site usually takes three to five weeks including content and revisions. Custom web applications and SaaS builds are scoped individually — think in months, with working software demonstrated weekly.',
    },
    {
      q: 'Do you build e-commerce websites?',
      a: 'Yes. A straightforward catalogue-and-checkout store fits in the Silver package; larger stores or custom commerce logic (quoting, wholesale pricing, subscriptions) move into Gold territory. We will tell you honestly which one you need.',
    },
    {
      q: 'Why are agency quotes so much higher for the same website?',
      a: 'You are paying for the agency, not just the website: account managers, offices, and processes designed for corporate clients. The build work is often comparable. Our model cuts that layer out — senior development, direct communication, roughly half the price of packages that start at R25,000 to R50,000.',
    },
  ];

  ngOnInit(): void {
    const path = '/website-design-prices-cape-town';
    this.seo.apply({
      title: 'Website Design Prices Cape Town (2026) | RogueTech',
      description:
        'What websites actually cost in Cape Town: templates from R500, freelancers, agencies from R25k, and the subscription trap — honest numbers and what you get.',
      path,
      ogType: 'article',
    });
    this.seo.setJsonLd(JSON_LD_ID, {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd(JSON_LD_ID);
  }
}
