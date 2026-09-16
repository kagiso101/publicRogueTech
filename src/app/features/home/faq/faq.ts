import { Component } from '@angular/core';
import { HOME_FAQS } from '../../../shared/content/faq-content';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  readonly faqs = HOME_FAQS;
  openFaqIndex: number | null = null;

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }
}
