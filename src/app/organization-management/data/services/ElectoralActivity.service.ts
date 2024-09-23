import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { ElectoralActivity } from './../interfaces';

// state interface
interface ElectoralActivityServiceState {
  electoralActivities: ElectoralActivity[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ElectoralActivityService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<ElectoralActivityServiceState>({
    electoralActivities: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public electoralActivities = computed(
    () => this.#state().electoralActivities
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
      .get<ElectoralActivity[]>('assets/demo/data/electoral-activities.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          electoralActivities: res,
          loading: false,
        });
      });
  }

  addNewElectoralActivity(name: string, description: string) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      electoralActivities: [
        ...lastState.electoralActivities,
        {
          id: 10,
          name: name,
          description: description,
        },
      ],
    }));
  }
}
