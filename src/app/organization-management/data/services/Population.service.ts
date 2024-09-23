import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { PopulationType } from '../interfaces';

// state interface
interface PopulationServiceState {
  populations: PopulationType[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PopulationService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<PopulationServiceState>({
    populations: Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      name: 'template',
      description: 'template',
    })),
    loading: true,
  });

  // signals to get the data
  public population = computed(() => this.#state().populations);

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
    // get the populations from back
    this.httpClient
      .get<PopulationType[]>('assets/demo/data/population-types.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          populations: res,
          loading: false,
        });
      });
  }

  addNewPopulationType(name: string, description: string) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      populations: [
        ...lastState.populations,
        { id: 10, name: name, description: description },
      ],
    }));
  }
}
