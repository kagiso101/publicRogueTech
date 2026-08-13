import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LeadsFacade } from '../../store/leads/leads.facade';
import { SeoService } from '../../shared/services/seo.service';
import { WizardProgressComponent } from '../../shared/components/wizard-progress/wizard-progress';
import { Step1ProjectTypeComponent } from './steps/step1-project-type/step1-project-type';
import { Step2BusinessComponent } from './steps/step2-business/step2-business';
import { Step3DetailsComponent } from './steps/step3-details/step3-details';
import { Step4BudgetTimelineComponent } from './steps/step4-budget-timeline/step4-budget-timeline';
import { Step5ContactComponent } from './steps/step5-contact/step5-contact';
import { ConfirmationComponent } from './outcomes/confirmation/confirmation';
import { CalendarBookingComponent } from './outcomes/calendar-booking/calendar-booking';

@Component({
  selector: 'app-get-started-page',
  standalone: true,
  imports: [
    WizardProgressComponent,
    Step1ProjectTypeComponent,
    Step2BusinessComponent,
    Step3DetailsComponent,
    Step4BudgetTimelineComponent,
    Step5ContactComponent,
    ConfirmationComponent,
    CalendarBookingComponent,
  ],
  templateUrl: './get-started-page.html',
  styleUrl: './get-started-page.scss',
})
export class GetStartedPage implements OnInit {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  readonly facade = inject(LeadsFacade);

  ngOnInit(): void {
    this.seo.apply({
      title: 'Get a Free Website Quote | RogueTech',
      description:
        'Tell us about your project in five quick steps and get a tailored quote for your website, web app or SaaS build — free, no obligation.',
      path: '/get-started',
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  next(): void {
    this.facade.nextStep();
  }

  back(): void {
    this.facade.previousStep();
  }
}