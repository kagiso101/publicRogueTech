import { Injectable, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConsultationModalComponent } from '../components/consultation-modal/consultation-modal';
import { LeadRequestProjectTypeEnum } from '../../api/model/leadRequest';

/**
 * Opens the consultation booking modal from any CTA on the site.
 * Optionally pre-selects the project type based on which button was clicked.
 */
@Injectable({ providedIn: 'root' })
export class ConsultationModalService {
  private readonly modal = inject(NgbModal);

  open(projectType?: LeadRequestProjectTypeEnum): NgbModalRef {
    const ref = this.modal.open(ConsultationModalComponent, {
      centered: true,
      scrollable: true,
      windowClass: 'rt-consult-window',
    });

    if (projectType) {
      (ref.componentInstance as ConsultationModalComponent).presetProjectType = projectType;
    }

    return ref;
  }
}
