import { signalStore, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withLeadsEffects } from './leads.effects';
import { withLeadsReducer } from './leads.reducer';
import { initialLeadsState } from '../../shared/models/lead.model';

export const LeadsStore = signalStore(
  { providedIn: 'root' },
  withState(initialLeadsState),
  withLeadsEffects(),
  withLeadsReducer(),
  withDevtools('leads-store')
);