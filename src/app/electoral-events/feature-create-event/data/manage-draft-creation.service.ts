import { inject, Injectable, signal } from '@angular/core';
import { FullDraft } from '@electoral-events/interfaces/full-draft-interface';
import { GeneralInfo } from '@electoral-events/interfaces/general-info.interface';
import { StartDraftService } from '../details-step/data/start-draft.service';
import { LoadElectiveOfficesService } from '../elective-offices-step/data/load-elective-offices.service';
import { ElectiveOfficeByCoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { SetElectoralPhasesRequest } from './requests-bodies-interfaces/set-electoral-phases-request.interface';
import { SetElectoralPhasesService } from '../schedule-step/data/set-electoral-phases.service';

@Injectable({
  providedIn: 'root',
})
export class ManageDraftCreationService {
  private startDraftService = inject(StartDraftService);
  private loadElectiveOfficesService = inject(LoadElectiveOfficesService);
  private setElectoralPhasesService = inject(SetElectoralPhasesService);

  private _currentDraft = signal<FullDraft>({
    id: '',
    title: '',
    description: '',
    startingDate: undefined,
    electionType: undefined,
    chargesToVote: [],
    schedule: [],
  });

  constructor() {}

  get id(): string {
    return this._currentDraft().id;
  }

  async submitDraftBaseInfo(baseInfo: GeneralInfo): Promise<boolean> {
    const resp = await this.startDraftService.execute(baseInfo);
    this._currentDraft.set({ ...this._currentDraft(), ...baseInfo });

    if (!resp) return false;
    return true;
  }

  async submitElectiveOffices(elective_offices: string[]): Promise<boolean> {
    // if (this._currentDraft().id.length === 0) return false;

    const resp = await this.loadElectiveOfficesService.execute(
      this._currentDraft().id,
      elective_offices
    );

    if (!resp) return false;
    return true;
  }

  async submitElectoralPhases(
    phasesRequest: SetElectoralPhasesRequest[]
  ): Promise<boolean> {
    // if (this._currentDraft().id.length === 0) return false;

    console.log({ phasesRequest });

    const resp = await this.setElectoralPhasesService.execute(
      this._currentDraft().id,
      phasesRequest
    );

    if (!resp) return false;
    return true;
  }
}
