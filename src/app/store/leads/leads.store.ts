import { signalStore, withState } from '@ngrx/signals';
import { withDevtools, withDevToolsStub } from '@angular-architects/ngrx-toolkit';
import { environment } from '../../../environments/environment';

// Redux DevTools wiring only in development builds; the stub is a same-signature no-op.
const withStoreDevtools = environment.production ? withDevToolsStub : withDevtools;
import { withLeadsEffects } from './leads.effects';
import { withLeadsReducer } from './leads.reducer';
import { initialLeadsState } from '../../shared/models/lead.model';

export const LeadsStore = signalStore(
  { providedIn: 'root' },
  withState(initialLeadsState),
  withLeadsEffects(),
  withLeadsReducer(),
  withStoreDevtools('leads-store')
);