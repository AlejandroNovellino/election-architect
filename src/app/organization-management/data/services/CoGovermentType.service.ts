import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { CoGovermentType } from './../interfaces';

// state interface
interface CoGovermentTypesServiceState {
  coGovermentTypes: CoGovermentType[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CoGovermentTypeService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<CoGovermentTypesServiceState>({
    coGovermentTypes: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public coGovermentTypes = computed(() => this.#state().coGovermentTypes);

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
    // get the types of co goverments from back
    this.httpClient
      .get<CoGovermentType[]>('assets/demo/data/co-goverments-types.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          coGovermentTypes: res,
          loading: false,
        });
      });
  }

  addNewCoGovermentType(name: string, description: string) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      coGovermentTypes: [
        ...lastState.coGovermentTypes,
        {
          id: 10,
          name: name,
          description: description,
        },
      ],
    }));
  }
}
