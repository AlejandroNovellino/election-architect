import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsible } from '@electoral-events/interfaces/responsible.interface';
import { environment } from '../../../../../environments/environments';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllResponsiblesService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(): Promise<Responsible[]> {
    const responsibles$ = this.http.get<Responsible[]>(
      `${this.baseUrl}/responsibles.json`
    );

    const responsibles = await firstValueFrom(responsibles$);

    if (!responsibles) return [];
    return responsibles;
  }
}
