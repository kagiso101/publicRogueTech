import { Component, inject } from '@angular/core';
import { LeadsFacade } from '../../../../store/leads/leads.facade';
import { LeadRequestProjectTypeEnum } from '../../../../api/model/leadRequest';

interface ProjectTypeOption {
  value: LeadRequestProjectTypeEnum;
  icon: string;       // Tabler icon class
  title: string;
  description: string;
}

@Component({
  selector: 'rt-step1-project-type',
  standalone: true,
  imports: [],
  templateUrl: './step1-project-type.html',
  styleUrl: './step1-project-type.scss',
})
export class Step1ProjectTypeComponent {
  readonly facade = inject(LeadsFacade);

  // Expose enum to the template
  readonly options: ProjectTypeOption[] = [
    {
      value: LeadRequestProjectTypeEnum.Website,
      icon: 'ti-world',
      title: 'A Website',
      description: 'Marketing site, portfolio, or business page',
    },
    {
      value: LeadRequestProjectTypeEnum.Webapp,
      icon: 'ti-app-window',
      title: 'A Web App',
      description: 'Internal tool, dashboard, custom workflow',
    },
    {
      value: LeadRequestProjectTypeEnum.Saas,
      icon: 'ti-cloud',
      title: 'A SaaS Product',
      description: 'Multi-tenant platform with customer accounts',
    },
    {
      value: LeadRequestProjectTypeEnum.Unsure,
      icon: 'ti-help',
      title: 'Not Sure Yet',
      description: 'I want to talk it through with someone',
    },
  ];

  select(value: LeadRequestProjectTypeEnum): void {
    this.facade.selectProjectType(value);
  }

  continue(): void {
    if (this.facade.projectType()) {
      this.facade.nextStep();
    }
  }
}