import {
  LeadRequestProjectTypeEnum,
  LeadRequestStageEnum,
  LeadRequestTimelineEnum,
} from '../../api/model/leadRequest';
import { WebsiteDetailsRequestPageCountEnum } from '../../api/model/websiteDetailsRequest';
import { WebappDetailsRequestUserTypeEnum } from '../../api/model/webappDetailsRequest';
import {
  SaasDetailsRequestNewOrRebuildEnum,
  SaasDetailsRequestValidationStageEnum,
  SaasDetailsRequestMultiTenantEnum,
} from '../../api/model/saasDetailsRequest';
import { LeadResponse } from '../../api/model/leadResponse';

// ─── Re-export the API enums as state types (single source of truth) ───
export type ProjectType = LeadRequestProjectTypeEnum;
export const ProjectType = LeadRequestProjectTypeEnum;

export type BusinessStage = LeadRequestStageEnum;
export const BusinessStage = LeadRequestStageEnum;

export type Timeline = LeadRequestTimelineEnum;
export const Timeline = LeadRequestTimelineEnum;

export type PageCount = WebsiteDetailsRequestPageCountEnum;
export const PageCount = WebsiteDetailsRequestPageCountEnum;

export type WebappUserType = WebappDetailsRequestUserTypeEnum;
export const WebappUserType = WebappDetailsRequestUserTypeEnum;

export type SaasBuildType = SaasDetailsRequestNewOrRebuildEnum;
export const SaasBuildType = SaasDetailsRequestNewOrRebuildEnum;

export type SaasValidation = SaasDetailsRequestValidationStageEnum;
export const SaasValidation = SaasDetailsRequestValidationStageEnum;

export type SaasMultiTenant = SaasDetailsRequestMultiTenantEnum;
export const SaasMultiTenant = SaasDetailsRequestMultiTenantEnum;

export type WizardStep = 1 | 2 | 3 | 4 | 5;

// ─── Branched details ───
export interface WebsiteDetails {
  hasExistingSite: boolean | null;
  pageCount: PageCount | null;
  features: string[];
}

export interface WebappDetails {
  problemStatement: string;
  userType: WebappUserType | null;
  features: string[];
}

export interface SaasDetails {
  newOrRebuild: SaasBuildType | null;
  validationStage: SaasValidation | null;
  yearOneCustomers: string;
  multiTenant: SaasMultiTenant | null;
}

// ─── Universal answers ───
export interface BusinessInfo {
  businessName: string;
  industry: string;
  stage: BusinessStage | null;
}

export interface ProjectInfo {
  timeline: Timeline | null;
  budgetRange: string;
}

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  consentGiven: boolean;
}

// ─── Full state ───
export interface LeadsState {
  currentStep: WizardStep;
  projectType: ProjectType | null;
  business: BusinessInfo;
  websiteDetails: WebsiteDetails;
  webappDetails: WebappDetails;
  saasDetails: SaasDetails;
  project: ProjectInfo;
  contact: ContactInfo;
  isSubmitting: boolean;
  submission: LeadResponse | null;
  error: string | null;
}

export const initialLeadsState: LeadsState = {
  currentStep: 1,
  projectType: null,
  business: {
    businessName: '',
    industry: '',
    stage: null,
  },
  websiteDetails: {
    hasExistingSite: null,
    pageCount: null,
    features: [],
  },
  webappDetails: {
    problemStatement: '',
    userType: null,
    features: [],
  },
  saasDetails: {
    newOrRebuild: null,
    validationStage: null,
    yearOneCustomers: '',
    multiTenant: null,
  },
  project: {
    timeline: null,
    budgetRange: '',
  },
  contact: {
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    consentGiven: false,
  },
  isSubmitting: false,
  submission: null,
  error: null,
};