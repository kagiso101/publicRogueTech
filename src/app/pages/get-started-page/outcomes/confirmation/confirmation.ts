import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeadsFacade } from '../../../../store/leads/leads.facade';

@Component({
  selector: 'rt-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class ConfirmationComponent {
  private readonly router = inject(Router);
  readonly facade = inject(LeadsFacade);

  goHome(): void {
    // Clean up state before leaving so a fresh wizard awaits next visitor
    this.facade.resetWizard();
    this.router.navigate(['/']);
  }
}