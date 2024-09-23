import { Injectable } from '@angular/core';
import { SetElectoralPhasesRequest } from '@electoral-events/feature-create-event/data/requests-bodies-interfaces/set-electoral-phases-request.interface';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SetElectoralPhasesService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(
    draftId: string,
    electoralPhases: SetElectoralPhasesRequest[]
  ): Promise<any> {
    console.log({ electoralPhases });

    const postRequest$ = this.http.post(
      `${this.baseUrl}/electoral-events/set-electoral-phases`,
      { draftId: 'ba25cf62-1272-4721-96b7-639d3472cf2e', electoralPhases }
    );

    postRequest$.subscribe((resp) => console.log({ resp }));
  }
}
