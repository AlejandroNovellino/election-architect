import { RequestType } from '@mail-app/data/enums/mail';
import { PossibleTemplatesResponses } from '@mail-app/data/interfaces/mailResponse';
import { responsesToChallenge } from './challenge-responses';

export const responseTemplates: PossibleTemplatesResponses = {
  [RequestType.Candidature]: responsesToChallenge,
  [RequestType.Challenge]: responsesToChallenge,
  [RequestType.Complaint]: responsesToChallenge,
};
