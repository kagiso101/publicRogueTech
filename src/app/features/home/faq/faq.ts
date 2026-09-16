import { Component } from '@angular/core';

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  openFaqIndex: number | null = null;

  faqs: FaqItem[] = [
    {
      q: 'How long does it take to build my website?',
      a: 'Bronze packages are typically live in 5-7 business days. More complex builds (Gold/Platinum) take 3-8 weeks depending on scope. You\'ll always know the timeline upfront.',
    },
    {
      q: 'Do I own my website?',
      a: 'Yes — always. ROGUETECHNOLOGIES owns no part of your site. Your domain, your code, your content. We build and maintain it; you own it outright.',
    },
    {
      q: 'Do I have to commit to anything ongoing?',
      a: 'No. You pay once for the project and own it outright. Optional add-ons like our Care Plan, SEO, and social management are month-to-month — start, pause, or cancel anytime.',
    },
    {
      q: 'Can I upgrade my package later?',
      a: 'Absolutely. Most clients start on Bronze or Silver and grow into Gold. You can upgrade at any time — no penalty.',
    },
    {
      q: 'I\'m not technical at all — is ROGUETECHNOLOGIES for me?',
      a: 'That\'s exactly who we built this for. You don\'t need to understand any of it. We handle everything and keep you in the loop with weekly demos and plain-language updates.',
    },
    {
      q: 'Do you work outside of Cape Town?',
      a: 'Yes. We\'re based in Cape Town and work remotely with clients across South Africa — your location doesn\'t matter at all.',
    },
  ];

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }
}