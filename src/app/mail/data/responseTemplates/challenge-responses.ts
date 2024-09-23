import { RequestStatus } from '@mail-app/data/enums/mail';
import { ResponseToRequestBaseOnStatus } from '@mail-app/data/interfaces/mailResponse';

export const responsesToChallenge: ResponseToRequestBaseOnStatus = {
  [RequestStatus.Pending]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatus.Processing]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatus.Rejected]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatus.Approved]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatus.Disapproved]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  // TO DO THIS CAN RETURN EMPTY TEMPLATE
  [RequestStatus.Accepted]: (name: string) => {
    return ``;
  },
};
