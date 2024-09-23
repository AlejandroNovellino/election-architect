import { Office } from './Office';
import { PopulationType } from './PopulationType';

export interface CoGovermentType {
  id: string;
  name: string;
  description: string;
}

export interface CoGovermentVotingType {
  id: string;
  name: string;
}

interface CoGovermentOffice {
  id: string;
  office: string;
  amount: number;
  electors: string[];
  candidates: string[];
}

export interface CoGoverment {
  id: string;
  name: string;
  description: string;
  votingType: string;
  coGovermentType: string;
  dependency: string;
  electiveOffices: CoGovermentOffice[];
}
