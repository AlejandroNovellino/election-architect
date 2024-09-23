import { RequestStatus, RequestType } from '@mail-app/data/enums/mail';

export interface PossibleResponses {
  [RequestStatus.Pending]: (keyof typeof RequestStatus)[];
  [RequestStatus.Processing]: (keyof typeof RequestStatus)[];
  [RequestStatus.Rejected]: (keyof typeof RequestStatus)[];
  [RequestStatus.Approved]: (keyof typeof RequestStatus)[];
  [RequestStatus.Disapproved]: (keyof typeof RequestStatus)[];
  [RequestStatus.Accepted]: (keyof typeof RequestStatus)[];
}

type CallbackFunction = (name: string) => string;

export interface ResponseToRequestBaseOnStatus {
  [RequestStatus.Pending]: CallbackFunction;
  [RequestStatus.Processing]: CallbackFunction;
  [RequestStatus.Rejected]: CallbackFunction;
  [RequestStatus.Approved]: CallbackFunction;
  [RequestStatus.Disapproved]: CallbackFunction;
  [RequestStatus.Accepted]: CallbackFunction;
}

export interface PossibleTemplatesResponses {
  [RequestType.Candidature]: ResponseToRequestBaseOnStatus;
  [RequestType.Challenge]: ResponseToRequestBaseOnStatus;
  [RequestType.Complaint]: ResponseToRequestBaseOnStatus;
}
