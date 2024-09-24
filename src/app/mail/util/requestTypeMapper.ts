import { RequestTypeEnum } from './../data/enums';

export const requestTypeMapper = (requestType: string | undefined) => {
  switch (requestType) {
    case RequestTypeEnum.Candidature:
      return 'Candidatura';

    case RequestTypeEnum.Challenge:
      return 'Impugnación';

    case RequestTypeEnum.Complaint:
      return 'Denuncia';

    default:
      return 'Tipo no registrado';
  }
};
