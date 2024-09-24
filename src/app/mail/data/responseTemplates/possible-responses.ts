import { RequestStatusEnum } from './../enums';
import { PossibleResponses } from './../interfaces';

export const possibleResponses: PossibleResponses = {
  [RequestStatusEnum.Pending]: [
    RequestStatusEnum.Processing,
    RequestStatusEnum.Rejected,
  ],
  [RequestStatusEnum.Processing]: [
    RequestStatusEnum.Approved,
    RequestStatusEnum.Disapproved,
  ],
  [RequestStatusEnum.Rejected]: [],
  [RequestStatusEnum.Approved]: [],
  [RequestStatusEnum.Disapproved]: [],
  [RequestStatusEnum.Accepted]: [],
};
