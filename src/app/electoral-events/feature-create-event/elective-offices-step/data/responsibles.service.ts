import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Responsible } from '../../../interfaces/responsible.interface';

@Injectable({
  providedIn: 'root',
})
export class ResponsiblesService {
  public responsibles: Responsible[] = [
    {
      id: uuidv4(),
      name: 'Comisión Electoral',
    },
    {
      id: uuidv4(),
      name: 'Subcomisión Electoral',
    },
  ];

  getAllResponsibles(): Responsible[] {
    return this.responsibles;
  }

  getResponsibleById(id: string): Responsible {
    const responsible = this.responsibles.find(
      (responsible) => responsible.id === id
    );
    if (responsible) return responsible;
    throw new Error('Responsible not found');
  }

  getResponsibleByName(name: string): Responsible {
    const responsible = this.responsibles.find(
      (responsible) => responsible.name === name
    );
    if (responsible) return responsible;
    throw new Error('Responsible not found');
  }
}
