import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectiveOffice } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { environment } from '../../../../../environments/environments';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetElectiveOfficesByCoGovermentIdService {
  constructor(private readonly http: HttpClient) {}

  private readonly baseUrl = environment.base_url;

  async execute(id: string): Promise<ElectiveOffice[]> {
    const electiveOffices$ = this.http.get<ElectiveOffice[]>(
      `${this.baseUrl}/co-goverments/${id}`
    );

    const electiveOffices = await firstValueFrom(electiveOffices$);

    if (!electiveOffices) return [];
    return electiveOffices;
  }
}
