import { Component, OnInit, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeadsFacade } from '../../../../store/leads/leads.facade';
import {
  LeadRequestProjectTypeEnum,
  LeadRequestTimelineEnum,
} from '../../../../api/model/leadRequest';

interface BudgetOption {
  value: string;
  label: string;
}

interface TimelineOption {
  value: LeadRequestTimelineEnum;
  label: string;
}

@Component({
  selector: 'rt-step4-budget-timeline',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step4-budget-timeline.html',
  styleUrl: './step4-budget-timeline.scss',
})
export class Step4BudgetTimelineComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LeadsFacade);

  // Capture destroy ref in injection context
  private readonly destroyRef = takeUntilDestroyed();

  readonly form: FormGroup = this.fb.group({
    timeline: [null as LeadRequestTimelineEnum | null, Validators.required],
    budgetRange: ['', Validators.required],
  });

  readonly timelineOptions: TimelineOption[] = [
    { value: LeadRequestTimelineEnum.Asap, label: 'As soon as possible' },
    { value: LeadRequestTimelineEnum.OneToThreeMonths, label: '1–3 months' },
    { value: LeadRequestTimelineEnum.ThreeToSixMonths, label: '3–6 months' },
    { value: LeadRequestTimelineEnum.SixToTwelveMonths, label: '6–12 months' },
    { value: LeadRequestTimelineEnum.NoRush, label: 'No rush, exploring options' },
  ];

  private readonly websiteBudgets: BudgetOption[] = [
    { value: 'website-5-10k', label: 'R5,000 – R10,000' },
    { value: 'website-10-25k', label: 'R10,000 – R25,000' },
    { value: 'website-25k+', label: 'R25,000+' },
  ];

  private readonly webappBudgets: BudgetOption[] = [
    { value: 'webapp-25-60k', label: 'R25,000 – R60,000' },
    { value: 'webapp-60-100k', label: 'R60,000 – R100,000' },
    { value: 'webapp-100k+', label: 'R100,000+' },
  ];

  private readonly saasBudgets: BudgetOption[] = [
    { value: 'saas-100-250k', label: 'R100,000 – R250,000' },
    { value: 'saas-250-500k', label: 'R250,000 – R500,000' },
    { value: 'saas-500k+', label: 'R500,000+' },
    { value: 'saas-unsure', label: "Not sure — let's discuss" },
  ];

  private readonly unsureBudgets: BudgetOption[] = [
    { value: 'unsure-under-25k', label: 'Under R25,000' },
    { value: 'unsure-25-100k', label: 'R25,000 – R100,000' },
    { value: 'unsure-100k+', label: 'R100,000+' },
    { value: 'unsure-unsure', label: 'Not sure yet' },
  ];

  readonly budgetOptions = computed<BudgetOption[]>(() => {
    switch (this.facade.projectType()) {
      case LeadRequestProjectTypeEnum.Website: return this.websiteBudgets;
      case LeadRequestProjectTypeEnum.Webapp: return this.webappBudgets;
      case LeadRequestProjectTypeEnum.Saas: return this.saasBudgets;
      case LeadRequestProjectTypeEnum.Unsure: return this.unsureBudgets;
      default: return [];
    }
  });

  ngOnInit(): void {
    const existing = this.facade.project();
    if (existing.timeline || existing.budgetRange) {
      this.form.patchValue(existing, { emitEvent: false });
    }

    this.form.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        this.facade.updateProjectInfo({
          timeline: value.timeline ?? null,
          budgetRange: value.budgetRange ?? '',
        });
      });
  }

  continue(): void {
    if (this.form.valid) {
      this.facade.nextStep();
    }
  }

  back(): void {
    this.facade.previousStep();
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}