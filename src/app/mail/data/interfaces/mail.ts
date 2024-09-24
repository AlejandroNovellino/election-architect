import { RequestStatusEnum, RequestTypeEnum } from './../enums';

export interface MailResponse {
  data: Mail[];
}

export interface Mail {
  id?: any;
  from?: string;
  to?: string;
  email?: string;
  image?: string; // subject image
  date?: string;
  message?: string;
  title?: string;
  important?: boolean; // bookmark
  starred?: boolean; // start
  trash?: boolean;
  archived?: boolean;
  spam?: boolean;
  sent?: boolean;
  requestType?: keyof typeof RequestTypeEnum;
  requestStatus?: keyof typeof RequestStatusEnum;
  read?: boolean;
}
