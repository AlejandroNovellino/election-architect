import { ElectoralEventCharge } from './ElectoralEventCharge';

export interface ElectoralEvent {
  id: string;
  name: string;
  active: boolean;
  charges: ElectoralEventCharge[];
}
