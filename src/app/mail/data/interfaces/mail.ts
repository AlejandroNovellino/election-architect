import { RequestStatus, RequestType } from '@mail-app/data/enums/mail';

export interface MailResponse {
  data: Mail[];
}

export interface Mail {
  id?: any;
  from?: string;
  to?: string;
  email?: string;
  image?: string;
  date?: string;
  message?: string;
  title?: string;
  important?: boolean;
  starred?: boolean;
  trash?: boolean;
  archived?: boolean;
  spam?: boolean;
  sent?: boolean;
  requestType?: keyof typeof RequestType;
  requestStatus?: keyof typeof RequestStatus;
  read?: boolean;
}
