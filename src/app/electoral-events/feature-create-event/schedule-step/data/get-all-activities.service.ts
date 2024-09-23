import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '@electoral-events/interfaces/activity.interface';
import { environment } from '../../../../../environments/environments';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllActivitiesService {
  private readonly baseUrl = environment.base_url;

  constructor(private readonly http: HttpClient) {}

  async execute(): Promise<Activity[]> {
    const activities$ = this.http.get<Activity[]>(`${this.baseUrl}/activities`);

    const activities = await firstValueFrom(activities$);

    if (!activities) return [];
    return activities;
  }
}
