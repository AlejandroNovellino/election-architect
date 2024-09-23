import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FullDraft } from '@electoral-events/interfaces/full-draft-interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllDraftInfoService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(id: string): Promise<FullDraft> {
    const getInfoRequest$ = this.http.get<FullDraft>(
      `${this.baseUrl}/electoral-events/${id}`
    );

    const draftInfo = await firstValueFrom(getInfoRequest$);

    return draftInfo;
  }
}
