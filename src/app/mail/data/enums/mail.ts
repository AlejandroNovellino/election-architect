export enum RequestType {
  // type of request
  Challenge = 'Challenge',
  Candidature = 'Candidature',
  Complaint = 'Complaint',
}

export enum RequestStatus {
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

enum ChallengeStatus {
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

enum CandidatureStatus {
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

enum ComplaintStatus {
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
