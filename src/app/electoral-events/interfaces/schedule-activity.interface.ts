import { Activity } from './activity.interface';
import { Responsible } from './responsible.interface';

export interface ScheduleActivity {
  id: string;
  activity: Activity;
  responsibles: Responsible[];
  startingDate: Date;
  endingDate: Date;
  duration: number;
}
