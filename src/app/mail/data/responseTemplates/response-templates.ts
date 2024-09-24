import { RequestTypeEnum } from './../enums';
import { PossibleTemplatesResponses } from '@mail-app/data/interfaces/mailResponse';
import { responsesToChallenge } from './challenge-responses';

// TODO set the responses to Candidature and Challenge
export const responseTemplates: PossibleTemplatesResponses = {
  [RequestTypeEnum.Candidature]: responsesToChallenge,
  [RequestTypeEnum.Challenge]: responsesToChallenge,
  [RequestTypeEnum.Complaint]: responsesToChallenge,
};
