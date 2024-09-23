import { RequestStatus } from '@mail-app/data/enums/mail';
import { PossibleResponses } from '@mail-app/data/interfaces/mailResponse';

export const possibleResponses: PossibleResponses = {
  [RequestStatus.Pending]: [RequestStatus.Processing, RequestStatus.Rejected],
  [RequestStatus.Processing]: [
    RequestStatus.Approved,
    RequestStatus.Disapproved,
  ],
  [RequestStatus.Rejected]: [],
  [RequestStatus.Approved]: [],
  [RequestStatus.Disapproved]: [],
  [RequestStatus.Accepted]: [],
};
