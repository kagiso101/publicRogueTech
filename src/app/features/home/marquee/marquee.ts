import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.html',
  styleUrl: './marquee.scss',
})
export class Marquee {
  items = [
    'Web Design',
    'SEO Optimization',
    'Google Ads',
    'Social Media',
    'Custom Web Apps',
    'SaaS Platforms',
    'Client Dashboard',
    'Built in South Africa',
  ];

  // Duplicate for seamless loop
  get allItems(): string[] {
    return [...this.items, ...this.items];
  }
}