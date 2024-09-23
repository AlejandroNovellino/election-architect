import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { ActivityResponsible } from './../interfaces';

// state interface
interface ActivityResponsibleServiceState {
  activityResponsables: ActivityResponsible[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ActivityResponsibleService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<ActivityResponsibleServiceState>({
    activityResponsables: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public activityResponsables = computed(
    () => this.#state().activityResponsables
  );

  public loading = computed(() => this.#state().loading);

  constructor() {
    // get the data
    this.getData();
  }

  getData(): void {
    // set loading to true
    this.#state.update((lastState) => ({
      ...lastState,
      loading: true,
    }));
    // get the data from back
    this.httpClient
      .get<ActivityResponsible[]>('assets/demo/data/responsibles.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          activityResponsables: res,
          loading: false,
        });
      });
  }

  addNewActivityResponsible(name: string, description: string | null) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      activityResponsables: [
        ...lastState.activityResponsables,
        {
          id: 10,
          name: name,
          description: description,
        },
      ],
    }));
  }
}
