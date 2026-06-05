import { Component, OnInit, computed, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeadsFacade } from '../../../../store/leads/leads.facade';
import { LeadRequestProjectTypeEnum } from '../../../../api/model/leadRequest';

@Component({
  selector: 'rt-step3-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step3-details.html',
  styleUrl: './step3-details.scss',
})
export class Step3DetailsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LeadsFacade);

  // Capture destroy ref in injection context
  private readonly destroyRef = takeUntilDestroyed();

  readonly ProjectType = LeadRequestProjectTypeEnum;

  readonly websiteForm: FormGroup = this.fb.group({
    hasExistingSite: [null as boolean | null, Validators.required],
    pageCount: ['', Validators.required],
    features: this.fb.array([]),
  });

  readonly webappForm: FormGroup = this.fb.group({
    problemStatement: ['', [Validators.required, Validators.minLength(20)]],
    userType: ['', Validators.required],
    features: this.fb.array([]),
  });

  readonly saasForm: FormGroup = this.fb.group({
    newOrRebuild: ['', Validators.required],
    validationStage: ['', Validators.required],
    yearOneCustomers: [''],
    multiTenant: ['', Validators.required],
  });

  readonly pageCountOptions = [
    { value: 'ONE_TO_THREE', label: '1–3 pages' },
    { value: 'FOUR_TO_EIGHT', label: '4–8 pages' },
    { value: 'NINE_PLUS', label: '9+ pages' },
  ];

  readonly websiteFeatureOptions = [
    'Contact forms',
    'Booking system',
    'Online payments',
    'Blog / News',
    'Newsletter signup',
    'Live chat',
    'Multi-language',
    'Member login area',
  ];

  readonly userTypeOptions = [
    { value: 'INTERNAL_TEAM', label: 'Our internal team' },
    { value: 'CUSTOMERS', label: 'Our customers' },
    { value: 'PUBLIC', label: 'General public' },
    { value: 'MIXED', label: 'Mix of users' },
  ];

  readonly webappFeatureOptions = [
    'User accounts & authentication',
    'Admin dashboard',
    'Reporting & analytics',
    'File uploads',
    'Email notifications',
    'Third-party API integrations',
    'Role-based permissions',
    'Search & filtering',
  ];

  readonly newOrRebuildOptions = [
    { value: 'NEW', label: 'Building from scratch' },
    { value: 'REBUILD', label: 'Rebuilding an existing product' },
    { value: 'MIGRATE', label: 'Migrating from another platform' },
  ];

  readonly validationStageOptions = [
    { value: 'IDEA', label: 'Just an idea' },
    { value: 'VALIDATED', label: 'Validated with users' },
    { value: 'EARLY_TRACTION', label: 'Early traction / paying customers' },
    { value: 'SCALING', label: 'Already scaling' },
  ];

  readonly multiTenantOptions = [
    { value: 'YES', label: 'Yes, multi-tenant from day one' },
    { value: 'NO', label: 'No, single-tenant for now' },
    { value: 'UNSURE', label: 'Not sure yet' },
  ];

  readonly activeForm = computed<FormGroup | null>(() => {
    switch (this.facade.projectType()) {
      case LeadRequestProjectTypeEnum.Website: return this.websiteForm;
      case LeadRequestProjectTypeEnum.Webapp: return this.webappForm;
      case LeadRequestProjectTypeEnum.Saas: return this.saasForm;
      default: return null;
    }
  });

  ngOnInit(): void {
    this.hydrateWebsiteForm();
    this.hydrateWebappForm();
    this.hydrateSaasForm();
    this.wireWebsiteSync();
    this.wireWebappSync();
    this.wireSaasSync();
  }

  private hydrateWebsiteForm(): void {
    const existing = this.facade.websiteDetails();
    this.websiteForm.patchValue(
      {
        hasExistingSite: existing.hasExistingSite,
        pageCount: existing.pageCount ?? '',
      },
      { emitEvent: false }
    );
    this.setFeaturesArray(this.websiteForm, this.websiteFeatureOptions, existing.features);
  }

  private hydrateWebappForm(): void {
    const existing = this.facade.webappDetails();
    this.webappForm.patchValue(
      {
        problemStatement: existing.problemStatement,
        userType: existing.userType ?? '',
      },
      { emitEvent: false }
    );
    this.setFeaturesArray(this.webappForm, this.webappFeatureOptions, existing.features);
  }

  private hydrateSaasForm(): void {
    const existing = this.facade.saasDetails();
    this.saasForm.patchValue(
      {
        newOrRebuild: existing.newOrRebuild ?? '',
        validationStage: existing.validationStage ?? '',
        yearOneCustomers: existing.yearOneCustomers,
        multiTenant: existing.multiTenant ?? '',
      },
      { emitEvent: false }
    );
  }

  private setFeaturesArray(form: FormGroup, options: string[], saved: string[]): void {
    const arr = form.get('features') as FormArray;
    arr.clear({ emitEvent: false });
    options.forEach((opt) => {
      arr.push(new FormControl(saved.includes(opt)), { emitEvent: false });
    });
  }

  private wireWebsiteSync(): void {
    this.websiteForm.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        const features = this.checkedFeatures(value.features, this.websiteFeatureOptions);
        this.facade.updateWebsiteDetails({
          hasExistingSite: value.hasExistingSite,
          pageCount: value.pageCount || null,
          features,
        });
      });
  }

  private wireWebappSync(): void {
    this.webappForm.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        const features = this.checkedFeatures(value.features, this.webappFeatureOptions);
        this.facade.updateWebappDetails({
          problemStatement: value.problemStatement || '',
          userType: value.userType || null,
          features,
        });
      });
  }

  private wireSaasSync(): void {
    this.saasForm.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        this.facade.updateSaasDetails({
          newOrRebuild: value.newOrRebuild || null,
          validationStage: value.validationStage || null,
          yearOneCustomers: value.yearOneCustomers || '',
          multiTenant: value.multiTenant || null,
        });
      });
  }

  private checkedFeatures(arr: boolean[], options: string[]): string[] {
    return options.filter((_, i) => arr[i]);
  }

  websiteFeaturesArray(): FormArray {
    return this.websiteForm.get('features') as FormArray;
  }

  webappFeaturesArray(): FormArray {
    return this.webappForm.get('features') as FormArray;
  }

  continue(): void {
    if (this.facade.projectType() === LeadRequestProjectTypeEnum.Unsure) {
      this.facade.nextStep();
      return;
    }

    const active = this.activeForm();
    if (active?.valid) {
      this.facade.nextStep();
    }
  }

  back(): void {
    this.facade.previousStep();
  }

  isInvalid(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  canContinue(): boolean {
    if (this.facade.projectType() === LeadRequestProjectTypeEnum.Unsure) return true;
    return this.activeForm()?.valid ?? false;
  }
}