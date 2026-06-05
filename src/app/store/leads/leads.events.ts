import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { LeadRequest } from '../../api/model/leadRequest';
import { LeadResponse } from '../../api/model/leadResponse';
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

export const leadsEvents = eventGroup({
  source: 'Leads',
  events: {
    // ─── Wizard navigation ───
    goToStep: type<{ step: WizardStep }>(),
    nextStep: type<void>(),
    previousStep: type<void>(),
    resetWizard: type<void>(),

    // ─── Step 1: Project type ───
    selectProjectType: type<{ projectType: ProjectType }>(),

    // ─── Step 2: Business info ───
    updateBusinessInfo: type<{ business: BusinessInfo }>(),

    // ─── Step 3: Branched details (one of) ───
    updateWebsiteDetails: type<{ details: WebsiteDetails }>(),
    updateWebappDetails: type<{ details: WebappDetails }>(),
    updateSaasDetails: type<{ details: SaasDetails }>(),

    // ─── Step 4: Project params ───
    updateProjectInfo: type<{ project: ProjectInfo }>(),

    // ─── Step 5: Contact + submit ───
    updateContactInfo: type<{ contact: ContactInfo }>(),
    submitLead: type<{ request: LeadRequest }>(),
    submitLeadSuccess: type<{ response: LeadResponse }>(),
    submitLeadFailure: type<{ error: string }>(),
  },
});