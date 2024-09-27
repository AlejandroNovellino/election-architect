import { Injectable } from '@angular/core';
import {
  DraftStatus,
  GeneralDraftInfo,
} from '../interfaces/draft-events.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllDraftEventsService {
  constructor() {}

  execute(): GeneralDraftInfo[] {
    return [
      {
        id: '1',
        name: 'Elecciones estudiantiles 2024',
        startingDate: new Date('2023-04-01'),
        status: DraftStatus.enProgreso,
      },
      {
        id: '2',
        name: 'Elecciones estudiantiles 2023',
        startingDate: new Date('2023-04-02'),
        status: DraftStatus.finalizado,
      },
      {
        id: '3',
        name: 'Elecciones estudiantiles 2022',
        startingDate: new Date('2023-04-03'),
        status: DraftStatus.eliminado,
      },
    ];
  }
}
