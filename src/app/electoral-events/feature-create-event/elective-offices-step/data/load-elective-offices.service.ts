import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ElectiveOfficeByCoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';

interface LoadElectiveOfficesRequestBody {
  draftId: string;
  electiveOffices: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LoadElectiveOfficesService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(
    draftId: string,
    electiveOffices: string[]
  ): Promise<ElectiveOfficeByCoGoverment[]> {
    const requestBody: LoadElectiveOfficesRequestBody = {
      draftId: 'ba25cf62-1272-4721-96b7-639d3472cf2e',
      electiveOffices,
    };

    console.log({ requestBody });

    const postRequest$ = this.http.post(
      `${this.baseUrl}/electoral-events/set-elective-offices`,
      requestBody
    );

    postRequest$.subscribe((resp) => console.log({ resp }));

    return [];
  }
}
