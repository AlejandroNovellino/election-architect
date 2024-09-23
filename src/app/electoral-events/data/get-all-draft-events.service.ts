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
        name: 'Evento 1',
        startingDate: new Date('2023-04-01'),
        status: DraftStatus.enProgreso,
      },
      {
        id: '2',
        name: 'Evento 2',
        startingDate: new Date('2023-04-02'),
        status: DraftStatus.finalizado,
      },
      {
        id: '3',
        name: 'Evento 3',
        startingDate: new Date('2023-04-03'),
        status: DraftStatus.eliminado,
      },
    ];
  }
}
