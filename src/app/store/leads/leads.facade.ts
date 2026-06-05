import { Injectable, inject, computed } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { LeadsStore } from './leads.store';
import { leadsEvents } from './leads.events';
import { LeadRequest } from '../../api/model/leadRequest';
import {
  WizardStep,
  ProjectType,
  BusinessInfo,
  WebsiteDetails,
  WebappDetails,
  SaasDetails,
  ProjectInfo,
  ContactInfo,
} from '../../shared/models/lead.model';

@Injectable({ providedIn: 'root' })
export class LeadsFacade {
  private readonly store = inject(LeadsStore);
  private readonly dispatch = injectDispatch(leadsEvents);

  // ─── Selectors ───
  readonly currentStep = this.store.currentStep;
  readonly projectType = this.store.projectType;
  readonly business = this.store.business;
  readonly websiteDetails = this.store.websiteDetails;
  readonly webappDetails = this.store.webappDetails;
  readonly saasDetails = this.store.saasDetails;
  readonly project = this.store.project;
  readonly contact = this.store.contact;
  readonly isSubmitting = this.store.isSubmitting;
  readonly submission = this.store.submission;
  readonly error = this.store.error;

  // ─── Computed convenience selectors ───
  readonly isFirstStep = computed(() => this.currentStep() === 1);
  readonly isLastStep = computed(() => this.currentStep() === 5);
  readonly hasSubmitted = computed(() => this.submission() !== null);
  readonly needsCalendar = computed(() => this.submission()?.calendarRequired === true);

  // ─── Wizard navigation ───
  goToStep(step: WizardStep): void {
    this.dispatch.goToStep({ step });
  }

  nextStep(): void {
    this.dispatch.nextStep();
  }

  previousStep(): void {
    this.dispatch.previousStep();
  }

  resetWizard(): void {
    this.dispatch.resetWizard();
  }

  // ─── Step updates ───
  selectProjectType(projectType: ProjectType): void {
    this.dispatch.selectProjectType({ projectType });
  }

  updateBusinessInfo(business: BusinessInfo): void {
    this.dispatch.updateBusinessInfo({ business });
  }

  updateWebsiteDetails(details: WebsiteDetails): void {
    this.dispatch.updateWebsiteDetails({ details });
  }

  updateWebappDetails(details: WebappDetails): void {
    this.dispatch.updateWebappDetails({ details });
  }

  updateSaasDetails(details: SaasDetails): void {
    this.dispatch.updateSaasDetails({ details });
  }

  updateProjectInfo(project: ProjectInfo): void {
    this.dispatch.updateProjectInfo({ project });
  }

  updateContactInfo(contact: ContactInfo): void {
    this.dispatch.updateContactInfo({ contact });
  }

  // ─── Submission ───
  submitLead(request: LeadRequest): void {
    this.dispatch.submitLead({ request });
  }
}