import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeadControllerService } from '../../../api/api/leadController.service';
import {
  LeadRequest,
  LeadRequestProjectTypeEnum,
  LeadRequestStageEnum,
  LeadRequestTimelineEnum,
} from '../../../api/model/leadRequest';
import { LeadResponse } from '../../../api/model/leadResponse';

@Component({
  selector: 'rt-consultation-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './consultation-modal.html',
  styleUrl: './consultation-modal.scss',
})
export class ConsultationModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly leadService = inject(LeadControllerService);
  private readonly router = inject(Router);
  readonly activeModal = inject(NgbActiveModal);

  /** Optionally set by ConsultationModalService before first render. */
  presetProjectType: LeadRequestProjectTypeEnum = LeadRequestProjectTypeEnum.Unsure;

  readonly submitting = signal(false);
  readonly submitted = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly calendarRequired = signal(false);

  /** Same Cal.com event as the wizard's calendar-booking outcome. */
  readonly bookingUrl = 'https://cal.com/roguetech/strategy-call';

  readonly projectTypeOptions = [
    { value: LeadRequestProjectTypeEnum.Unsure, label: 'Not sure yet — let’s talk' },
    { value: LeadRequestProjectTypeEnum.Website, label: 'A website' },
    { value: LeadRequestProjectTypeEnum.Webapp, label: 'A web application' },
    { value: LeadRequestProjectTypeEnum.Saas, label: 'A SaaS product' },
  ];

  readonly stageOptions = [
    { value: LeadRequestStageEnum.JustStarting, label: 'Just starting out' },
    { value: LeadRequestStageEnum.Established, label: 'Established business' },
    { value: LeadRequestStageEnum.GoingDigital, label: 'Established, going digital' },
    { value: LeadRequestStageEnum.AlreadyOnline, label: 'Already online' },
  ];

  readonly timelineOptions = [
    { value: LeadRequestTimelineEnum.Asap, label: 'As soon as possible' },
    { value: LeadRequestTimelineEnum.OneToThreeMonths, label: '1–3 months' },
    { value: LeadRequestTimelineEnum.ThreeToSixMonths, label: '3–6 months' },
    { value: LeadRequestTimelineEnum.SixToTwelveMonths, label: '6–12 months' },
    { value: LeadRequestTimelineEnum.NoRush, label: 'No rush — exploring options' },
  ];

  readonly form: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    businessName: ['', Validators.required],
    industry: ['', Validators.required],
    stage: [null as LeadRequestStageEnum | null, Validators.required],
    projectType: [LeadRequestProjectTypeEnum.Unsure, Validators.required],
    timeline: [null as LeadRequestTimelineEnum | null, Validators.required],
    notes: [''],
    consentGiven: [false, Validators.requiredTrue],
    // Honeypot — visually hidden; the backend drops submissions that fill it
    website: [''],
  });

  ngOnInit(): void {
    this.form.patchValue({ projectType: this.presetProjectType }, { emitEvent: false });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.submitting()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const request: LeadRequest = {
      projectType: value.projectType!,
      businessName: value.businessName,
      industry: value.industry,
      stage: value.stage!,
      timeline: value.timeline!,
      budgetRange: 'To be discussed',
      fullName: value.fullName,
      email: value.email,
      phone: value.phone || undefined,
      notes: value.notes || undefined,
      consentGiven: value.consentGiven,
      sourcePage: this.router.url,
      website: value.website || undefined,
    };

    this.submitting.set(true);
    this.submitError.set(null);

    this.leadService.submit(request).subscribe({
      next: (response) => {
        this.resolveResponse(response).then((data) => {
          this.submitting.set(false);
          this.submitted.set(true);
          this.calendarRequired.set(data?.calendarRequired === true);
        });
      },
      error: () => {
        this.submitting.set(false);
        this.submitError.set(
          'Something went wrong sending your request. Please try again in a moment.'
        );
      },
    });
  }

  // The generated client can emit a Blob (wildcard accept header) — normalise to JSON.
  private resolveResponse(response: unknown): Promise<LeadResponse | null> {
    if (response instanceof Blob) {
      return response.text().then((text) => (text ? JSON.parse(text) : null));
    }
    return Promise.resolve(response as LeadResponse);
  }
}
