import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralInfo } from '@electoral-events/interfaces/general-info.interface';
import { environment } from '../../../../../environments/environments';
import { firstValueFrom } from 'rxjs';

interface StartDraftRequestBody {
  title: string;
  description: string;
  type: string;
  startingDate: Date;
}

export interface StartDraftResponse {
  id: string;
  title: string;
  description: string;
  startingDate: Date;
  electionTypeId: string;
}

@Injectable({
  providedIn: 'root',
})
export class StartDraftService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(baseInfo: GeneralInfo): Promise<StartDraftResponse> {
    console.log({ baseInfo });

    const requestBody: StartDraftRequestBody = {
      title: baseInfo.title,
      description: baseInfo.description,
      type: baseInfo.electionType!.id,
      startingDate: baseInfo.startingDate!,
    };

    console.log({ requestBody });

    const postRequest$ = this.http.post<StartDraftResponse>(
      `${this.baseUrl}/electoral-events.json`,
      requestBody
    );

    return await firstValueFrom(postRequest$);
  }
}
