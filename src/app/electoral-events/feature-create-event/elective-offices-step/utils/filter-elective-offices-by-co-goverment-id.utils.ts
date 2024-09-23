import {
  ElectiveOffice,
  ElectiveOfficeByCoGoverment,
} from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';

export const filterElectiveOfficesByCoGovermentId = (
  electiveOfficesByCoGoverment: ElectiveOfficeByCoGoverment[],
  id: string
): ElectiveOffice[] => {
  return (
    electiveOfficesByCoGoverment.find((eo) => eo.coGoverment.id === id)
      ?.electiveOffices || []
  );
};
