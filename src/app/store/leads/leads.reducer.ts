import { signalStoreFeature, type } from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { leadsEvents } from './leads.events';
import { LeadsState, initialLeadsState } from '../../shared/models/lead.model';

export function withLeadsReducer() {
  return signalStoreFeature(
    type<{ state: LeadsState }>(),
    withReducer(
      // ─── Wizard navigation ───
      on(leadsEvents.goToStep, ({ payload }) => ({
        currentStep: payload.step,
        error: null,
      })),
      on(leadsEvents.nextStep, () => (state) => {
        const next = Math.min(state.currentStep + 1, 5) as 1 | 2 | 3 | 4 | 5;
        return { currentStep: next, error: null };
      }),
      on(leadsEvents.previousStep, () => (state) => {
        const prev = Math.max(state.currentStep - 1, 1) as 1 | 2 | 3 | 4 | 5;
        return { currentStep: prev, error: null };
      }),
      on(leadsEvents.resetWizard, () => initialLeadsState),

      // ─── Step 1: Project type ───
      on(leadsEvents.selectProjectType, ({ payload }) => ({
        projectType: payload.projectType,
      })),

      // ─── Step 2: Business info ───
      on(leadsEvents.updateBusinessInfo, ({ payload }) => ({
        business: payload.business,
      })),

      // ─── Step 3: Branched details ───
      on(leadsEvents.updateWebsiteDetails, ({ payload }) => ({
        websiteDetails: payload.details,
      })),
      on(leadsEvents.updateWebappDetails, ({ payload }) => ({
        webappDetails: payload.details,
      })),
      on(leadsEvents.updateSaasDetails, ({ payload }) => ({
        saasDetails: payload.details,
      })),

      // ─── Step 4: Project info ───
      on(leadsEvents.updateProjectInfo, ({ payload }) => ({
        project: payload.project,
      })),

      // ─── Step 5: Contact + submission ───
      on(leadsEvents.updateContactInfo, ({ payload }) => ({
        contact: payload.contact,
      })),
      on(leadsEvents.submitLead, () => ({
        isSubmitting: true,
        error: null,
      })),
      on(leadsEvents.submitLeadSuccess, ({ payload }) => ({
        isSubmitting: false,
        submission: payload.response,
        error: null,
      })),
      on(leadsEvents.submitLeadFailure, ({ payload }) => ({
        isSubmitting: false,
        error: payload.error,
      })),
    )
  );
}