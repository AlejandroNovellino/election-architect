import { RequestStatusEnum, RequestTypeEnum } from './../enums';

export interface PossibleResponses {
  [RequestStatusEnum.Pending]: (keyof typeof RequestStatusEnum)[];
  [RequestStatusEnum.Processing]: (keyof typeof RequestStatusEnum)[];
  [RequestStatusEnum.Rejected]: (keyof typeof RequestStatusEnum)[];
  [RequestStatusEnum.Approved]: (keyof typeof RequestStatusEnum)[];
  [RequestStatusEnum.Disapproved]: (keyof typeof RequestStatusEnum)[];
  [RequestStatusEnum.Accepted]: (keyof typeof RequestStatusEnum)[];
}

type CallbackFunction = (name: string) => string;

export interface ResponseToRequestBaseOnStatus {
  [RequestStatusEnum.Pending]: CallbackFunction;
  [RequestStatusEnum.Processing]: CallbackFunction;
  [RequestStatusEnum.Rejected]: CallbackFunction;
  [RequestStatusEnum.Approved]: CallbackFunction;
  [RequestStatusEnum.Disapproved]: CallbackFunction;
  [RequestStatusEnum.Accepted]: CallbackFunction;
}

export interface PossibleTemplatesResponses {
  [RequestTypeEnum.Candidature]: ResponseToRequestBaseOnStatus;
  [RequestTypeEnum.Challenge]: ResponseToRequestBaseOnStatus;
  [RequestTypeEnum.Complaint]: ResponseToRequestBaseOnStatus;
}
