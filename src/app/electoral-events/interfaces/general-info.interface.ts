import { ElectionType } from './election-type.interface';

export interface GeneralInfo {
  id: string;
  title: string;
  description: string;
  startingDate?: Date;
  electionType?: ElectionType;
}
