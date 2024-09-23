import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { CoGovermentVotingType } from './../interfaces';

// state interface
interface CoGovermentVotingTypesServiceState {
  coGovermentVotingTypes: CoGovermentVotingType[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CoGovermentVotingTypeService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<CoGovermentVotingTypesServiceState>({
    coGovermentVotingTypes: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public coGovermentVotingTypes = computed(
    () => this.#state().coGovermentVotingTypes
  );

  public loading = computed(() => this.#state().loading);

  constructor() {
    // get the data
    this.getData();
  }

  getData(): void {
    // set loading to true if the service has been
    // initialize and is not loading
    if (!this.loading()) {
      this.#state.update((lastState) => ({
        ...lastState,
        loading: true,
      }));
    }
    // get the types of co goverments from back
    this.httpClient
      .get<CoGovermentVotingType[]>(
        'assets/demo/data/co-goverment-voting-types.json'
      )
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          coGovermentVotingTypes: res,
          loading: false,
        });
      });
  }
}
