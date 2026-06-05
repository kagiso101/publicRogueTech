import { Component, input } from '@angular/core';
import { WizardStep } from '../../../shared/models/lead.model';

@Component({
  selector: 'rt-wizard-progress',
  standalone: true,
  imports: [],
  templateUrl: './wizard-progress.html',
  styleUrl: './wizard-progress.scss',
})
export class WizardProgressComponent {
  // Required input: which step we're on
  readonly current = input.required<WizardStep>();

  // Static config — wizard always has 5 steps
  readonly steps = [1, 2, 3, 4, 5] as const;
}