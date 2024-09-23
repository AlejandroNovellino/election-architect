import { inject, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FullDraft } from '../../interfaces/full-draft-interface';
import { GeneralInfo } from '../../interfaces/general-info.interface';
import { ElectiveOfficeByCoGoverment } from '../../interfaces/elective-office-by-co-goverment.interface';
import { ScheduleActivity } from '../../interfaces/schedule-activity.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateDraftService {
  private _currentDraft = signal<FullDraft>({
    id: uuidv4(),
    title: '',
    description: '',
    startingDate: undefined,
    electionType: undefined,
    chargesToVote: [],
    schedule: [],
  });

  constructor() {}

  get generalInfo(): GeneralInfo {
    return {
      id: this._currentDraft().id,
      title: this._currentDraft().title,
      description: this._currentDraft().description,
      startingDate: this._currentDraft().startingDate || undefined,
      electionType: this._currentDraft().electionType || undefined,
    };
  }

  get currentCharges(): ElectiveOfficeByCoGoverment[] {
    return this._currentDraft().chargesToVote;
  }

  get currentActivities(): ScheduleActivity[] {
    return this._currentDraft().schedule;
  }

  get draft(): FullDraft {
    return this._currentDraft();
  }

  setGeneralInfo(generalInfo: GeneralInfo): void {
    this._currentDraft.set({ ...this._currentDraft(), ...generalInfo });
    console.log('Desde general info', this._currentDraft());
    this.setFirstActivity();
  }

  private setFirstActivity(): void {
    // const firstActivity: ScheduleActivity = {
    //   id: uuidv4(),
    //   activity: this.scheduleService.getActivityByName(
    //     'Inicio del Evento Electoral'
    //   ),
    //   responsibles: [
    //     this.responsiblesService.getResponsibleByName('Comisión Electoral'),
    //   ],
    //   startingDate: this._currentDraft().startingDate!,
    //   endingDate: this._currentDraft().startingDate!,
    //   duration: 0,
    // };
    // this._currentDraft.update((current) => {
    //   current.schedule.push(firstActivity);
    //   return current;
    // });
  }

  saveDraft(saveConfig: boolean): void {
    console.log({ saveConfig });
  }

  setCharges(chargesToAdd: ElectiveOfficeByCoGoverment[]) {
    console.log({ chargesToAdd });

    this._currentDraft.update((current) => {
      current.chargesToVote = chargesToAdd;
      return current;
    });
  }

  setSchedule(schedule: ScheduleActivity[]) {
    this._currentDraft.update((current) => {
      current.schedule = schedule;
      return current;
    });
    console.log(this._currentDraft());
  }
}
