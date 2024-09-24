import { RequestStatusEnum } from './../data/enums';

export const requestStatusMapper = (requestStatus: string | undefined) => {
  switch (requestStatus) {
    case RequestStatusEnum.Pending:
      return 'Pendiente';
    case RequestStatusEnum.Rejected:
      return 'Rechazada';
    case RequestStatusEnum.Disapproved:
      return 'Desaprobada';
    case RequestStatusEnum.Approved:
      return 'Aprobada';
    case RequestStatusEnum.Processing:
      return 'Procesando';
    default:
      return 'Sin status';
  }
};
