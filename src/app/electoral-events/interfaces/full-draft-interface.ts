import { ElectionType } from './election-type.interface';
import { ElectiveOfficeByCoGoverment } from './elective-office-by-co-goverment.interface';
import { ScheduleActivity } from './schedule-activity.interface';

export interface FullDraft {
  id: string;
  title: string;
  description: string;
  startingDate?: Date;
  electionType?: ElectionType;
  chargesToVote: ElectiveOfficeByCoGoverment[];
  schedule: ScheduleActivity[];
}
