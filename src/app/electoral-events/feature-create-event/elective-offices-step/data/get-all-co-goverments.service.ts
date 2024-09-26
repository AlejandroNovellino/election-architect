import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { CoGoverment } from '@electoral-events/interfaces/elective-office-by-co-goverment.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllCoGovermentsService {
  constructor(private readonly http: HttpClient) {}

  private readonly baseUrl = environment.base_url;

  async execute(): Promise<CoGoverment[]> {
    try {
      const coGoverments$ = this.http.get<CoGoverment[]>(
        `${this.baseUrl}/co-goverments.json`
      );

      const coGoverments = firstValueFrom(coGoverments$);

      if (coGoverments) return coGoverments;
      return [];
    } catch (error) {
      console.log('Error fetching co-goverments', error);
      return [];
    }
  }
}
