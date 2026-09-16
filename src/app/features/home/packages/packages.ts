import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../shared/services/analytics.service';
import { ConsultationModalService } from '../../../shared/services/consultation-modal.service';
import { LeadRequestProjectTypeEnum } from '../../../api/model/leadRequest';
import { PACKAGES } from '../../../shared/content/packages-content';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages implements OnInit {
  readonly packages = PACKAGES;

  private readonly consultationModal = inject(ConsultationModalService);
  private readonly analytics = inject(AnalyticsService);

  ngOnInit(): void {
    // This component renders the packages section on both the home page and
    // the pricing page (<app-packages> is embedded there), so firing here
    // covers both surfaces exactly once per view.
    this.analytics.event('package_viewed');
  }

  openConsultation(): void {
    this.consultationModal.open(LeadRequestProjectTypeEnum.Website);
  }
}
