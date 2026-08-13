import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeadsFacade } from '../../../../store/leads/leads.facade';
import {
  LeadRequest,
  LeadRequestProjectTypeEnum,
} from '../../../../api/model/leadRequest';

@Component({
  selector: 'rt-step5-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step5-contact.html',
  styleUrl: './step5-contact.scss',
})
export class Step5ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LeadsFacade);

  // Capture destroy ref in injection context
  private readonly destroyRef = takeUntilDestroyed();

  readonly form: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    notes: [''],
    consentGiven: [false, Validators.requiredTrue],
    // Honeypot — visually hidden; the backend drops submissions that fill it
    website: [''],
  });

  ngOnInit(): void {
    const existing = this.facade.contact();
    this.form.patchValue(existing, { emitEvent: false });

    this.form.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        this.facade.updateContactInfo({
          fullName: value.fullName ?? '',
          email: value.email ?? '',
          phone: value.phone ?? '',
          notes: value.notes ?? '',
          consentGiven: value.consentGiven ?? false,
        });
      });
  }

  submit(): void {
    if (this.form.invalid || this.facade.isSubmitting()) return;

    const request = this.buildRequest();
    this.facade.submitLead(request);
  }

  back(): void {
    this.facade.previousStep();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  private buildRequest(): LeadRequest {
    const business = this.facade.business();
    const project = this.facade.project();
    const contact = this.facade.contact();
    const projectType = this.facade.projectType();

    const base: LeadRequest = {
      projectType: projectType!,
      businessName: business.businessName,
      industry: business.industry,
      stage: business.stage!,
      timeline: project.timeline!,
      budgetRange: project.budgetRange,
      fullName: contact.fullName,
      email: contact.email,
      phone: contact.phone || undefined,
      notes: contact.notes || undefined,
      consentGiven: contact.consentGiven,
      sourcePage: '/get-started',
      website: this.form.getRawValue().website || undefined,
    };

    switch (projectType) {
      case LeadRequestProjectTypeEnum.Website: {
        const w = this.facade.websiteDetails();
        base.websiteDetails = {
          hasExistingSite: w.hasExistingSite ?? undefined,
          pageCount: w.pageCount ?? undefined,
          features: w.features,
        };
        break;
      }
      case LeadRequestProjectTypeEnum.Webapp: {
        const w = this.facade.webappDetails();
        base.webappDetails = {
          problemStatement: w.problemStatement,
          userType: w.userType ?? undefined,
          features: w.features,
        };
        break;
      }
      case LeadRequestProjectTypeEnum.Saas: {
        const s = this.facade.saasDetails();
        base.saasDetails = {
          newOrRebuild: s.newOrRebuild ?? undefined,
          validationStage: s.validationStage ?? undefined,
          yearOneCustomers: s.yearOneCustomers || undefined,
          multiTenant: s.multiTenant ?? undefined,
        };
        break;
      }
    }

    return base;
  }
}