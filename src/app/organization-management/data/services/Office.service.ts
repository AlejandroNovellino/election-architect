import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { Office } from '../interfaces';

// state interface
interface OfficeServiceState {
  offices: Office[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<OfficeServiceState>({
    offices: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public offices = computed(() => this.#state().offices);

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
    // get the offices from back
    this.httpClient
      .get<Office[]>('assets/demo/data/offices.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          offices: res,
          loading: false,
        });
      });
  }

  addNewOffice(name: string, description: string) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      offices: [
        ...lastState.offices,
        { id: 10, name: name, description: description },
      ],
    }));
  }
}
