export type ProjectType = 'website' | 'webapp' | 'saas' | 'unsure';

export type Stage = 'just-starting' | 'established' | 'going-digital' | 'already-online';

export type Timeline = 'asap' | '1-3-months' | '3-6-months' | '6-12-months' | 'no-rush';

export interface WizardState {
  // Step 1
  projectType: ProjectType | null;

  // Step 2
  businessName: string;
  industry: string;
  stage: Stage | null;

  // Step 3 — varies per path
  websiteDetails?: WebsiteDetails;
  webappDetails?: WebappDetails;
  saasDetails?: SaasDetails;

  // Step 4
  timeline: Timeline | null;
  budget: string;

  // Step 5
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;

  // Meta
  currentStep: number;
  startedAt: string;
}

export interface WebsiteDetails {
  hasExistingSite: boolean | null;
  pageCount: '1-3' | '5-7' | '10+' | 'unsure' | null;
  features: string[];
}

export interface WebappDetails {
  problemStatement: string;
  userType: 'single' | 'team' | 'customers' | 'multi-tenant' | null;
  features: string[];
}

export interface SaasDetails {
  newOrRebuild: 'new' | 'rebuild' | null;
  validation: 'no-validation' | 'talking' | 'waitlist' | 'paying' | null;
  yearOneCustomers: string;
  multiTenant: 'yes' | 'no' | 'unsure' | null;
}

export type LeadTier = 'low' | 'mid' | 'high';

export interface SubmissionPayload {
  state: WizardState;
  tier: LeadTier;
  submittedAt: string;
}