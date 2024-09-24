import { RequestStatusEnum } from './../enums';
import { ResponseToRequestBaseOnStatus } from '@mail-app/data/interfaces/mailResponse';

export const responsesToChallenge: ResponseToRequestBaseOnStatus = {
  [RequestStatusEnum.Pending]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatusEnum.Processing]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatusEnum.Rejected]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatusEnum.Approved]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  [RequestStatusEnum.Disapproved]: (name: string) => {
    return `
    To ${name}
    Lorem ipsum odor amet, consectetuer adipiscing elit.<br>
    Morbi auctor inceptos vivamus condimentum molestie nec venenatis nisl.
    `;
  },
  // TODO THIS CAN RETURN EMPTY TEMPLATE
  [RequestStatusEnum.Accepted]: (name: string) => {
    return ``;
  },
};
