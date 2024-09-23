import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElectiveOfficeByCoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { environment } from '../../../../../environments/environments';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllElectiveOfficesByCoGovermentService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = environment.base_url;

  async execute(): Promise<ElectiveOfficeByCoGoverment[]> {
    try {
      const electiveOffices$ = this.http.get<ElectiveOfficeByCoGoverment[]>(
        `${this.baseUrl}/elective-offices`
      );

      const electiveOffices = firstValueFrom(electiveOffices$);

      if (electiveOffices) return electiveOffices;
      return [];
    } catch (error) {
      console.log('Error fetching elective offices', error);
      return [];
    }
  }
}
