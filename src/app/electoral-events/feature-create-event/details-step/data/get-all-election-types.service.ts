import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ElectionType } from '@electoral-events/interfaces/election-type.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllElectionTypesService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.base_url;

  async execute(): Promise<ElectionType[]> {
    try {
      const electionTypes$ = this.http.get<ElectionType[]>(
        `${this.baseUrl}/electoral-events-types.json`
      );
      const electionTypes = await firstValueFrom(electionTypes$);

      if (electionTypes) return electionTypes;
      return [];
    } catch (err) {
      console.log('Error fetching election types', err);
      return [];
    }
  }
}
