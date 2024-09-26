import {
  ElectiveOffice,
  ElectiveOfficeByCoGoverment,
} from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';

export const filterElectiveOfficesByCoGovermentId = (
  electiveOfficesByCoGoverment: ElectiveOfficeByCoGoverment[],
  id: string
): ElectiveOffice[] => {
  return [
    {
      id: '2',
      name: 'Representante Estudiantil',
      quantity: 1,
    },
    {
      id: '3',
      name: 'Representante de Profesores',
      quantity: 2,
    },
    {
      id: '4',
      name: 'Representante de Egresados',
      quantity: 1,
    },
  ];

  // TODO delete the code above and used like it was suppose to be
  // return (
  //   electiveOfficesByCoGoverment.find((eo) => eo.coGoverment.id === id)
  //     ?.electiveOffices || []
  // );
};
