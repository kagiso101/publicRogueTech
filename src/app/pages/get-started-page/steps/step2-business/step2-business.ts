import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LeadsFacade } from '../../../../store/leads/leads.facade';
import { LeadRequestStageEnum } from '../../../../api/model/leadRequest';

interface StageOption {
  value: LeadRequestStageEnum;
  label: string;
}

@Component({
  selector: 'rt-step2-business',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step2-business.html',
  styleUrl: './step2-business.scss',
})
export class Step2BusinessComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly facade = inject(LeadsFacade);

  // Capture destroy ref in injection context (field initializer)
  private readonly destroyRef = takeUntilDestroyed();

  readonly form: FormGroup = this.fb.group({
    businessName: ['', [Validators.required, Validators.minLength(2)]],
    industry: ['', Validators.required],
    stage: [null as LeadRequestStageEnum | null, Validators.required],
  });

  readonly stageOptions: StageOption[] = [
    { value: LeadRequestStageEnum.JustStarting, label: 'Just starting out' },
    { value: LeadRequestStageEnum.Established, label: 'Established but going digital' },
    { value: LeadRequestStageEnum.GoingDigital, label: 'In the process of going digital' },
    { value: LeadRequestStageEnum.AlreadyOnline, label: 'Already online, want to upgrade' },
  ];

  ngOnInit(): void {
    const existing = this.facade.business();
    if (existing.businessName || existing.industry || existing.stage) {
      this.form.patchValue(existing, { emitEvent: false });
    }

    this.form.valueChanges
      .pipe(this.destroyRef)
      .subscribe((value : any) => {
        this.facade.updateBusinessInfo({
          businessName: value.businessName ?? '',
          industry: value.industry ?? '',
          stage: value.stage ?? null,
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