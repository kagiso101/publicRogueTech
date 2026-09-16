import { inject } from '@angular/core';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { switchMap, map, catchError, of, from, Observable } from 'rxjs';
import { LeadControllerService } from '../../api';
import { leadsEvents } from './leads.events';
import { LeadResponse } from '../../api/model/leadResponse';
import { AnalyticsService } from '../../shared/services/analytics.service';

export function withLeadsEffects() {
  return signalStoreFeature(
    { state: type<any>() },
    withEventHandlers((store, events = inject(Events)) => {
      const leadsService = inject(LeadControllerService);
      const analytics = inject(AnalyticsService);

      const parseBlob = (blob: Blob): Observable<any> => {
        return from(blob.text()).pipe(map((text) => (text ? JSON.parse(text) : {})));
      };

      return {
        submit$: events.on(leadsEvents.submitLead).pipe(
          switchMap((event) =>
            leadsService.submit(event.payload.request).pipe(
              switchMap((response) => {
                if (response instanceof Blob) return parseBlob(response);
                return of(response);
              }),
              map((data: LeadResponse) => {
                analytics.event('generate_lead', { source: 'wizard', tier: String(data?.tier ?? '') });
                return leadsEvents.submitLeadSuccess({ response: data });
              }),
              catchError((err) => {
                const msg =
                  err?.error?.message ||
                  err?.message ||
                  'Something went wrong submitting your enquiry. Please try again.';
                return of(leadsEvents.submitLeadFailure({ error: msg }));
              })
            )
          )
        ),
      };
    })
  );
}