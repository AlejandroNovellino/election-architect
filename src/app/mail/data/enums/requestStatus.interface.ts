export enum RequestStatusEnum {
  Pending = 'Pending',
  // this is for the request
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  // when the commission is working on it
  Processing = 'Processing',
  // this is for the response
  Approved = 'Approved',
  Disapproved = 'Disapproved',
}
