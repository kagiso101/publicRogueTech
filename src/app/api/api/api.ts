export * from './adminLeadController.service';
import { AdminLeadControllerService } from './adminLeadController.service';
export * from './leadController.service';
import { LeadControllerService } from './leadController.service';
export const APIS = [AdminLeadControllerService, LeadControllerService];
