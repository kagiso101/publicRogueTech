import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsultationModalService } from '../../../shared/services/consultation-modal.service';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
})
export class Cta {
  private readonly consultationModal = inject(ConsultationModalService);

  openConsultation(): void {
    this.consultationModal.open();
  }
}
