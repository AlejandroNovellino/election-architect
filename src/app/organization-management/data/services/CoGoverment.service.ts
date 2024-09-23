import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { CoGoverment } from './../interfaces';

// state interface
interface CoGovermentServiceState {
  coGoverments: CoGoverment[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CoGovermentService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<CoGovermentServiceState>({
    coGoverments: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public coGoverments = computed(() => this.#state().coGoverments);

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
    // get the dependencies from back
    this.httpClient
      .get<CoGoverment[]>('assets/demo/data/co-goverments.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          coGoverments: res,
          loading: false,
        });
      });
  }

  addNewCoGoverment(coGoverment: CoGoverment) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      coGoverments: [...lastState.coGoverments, coGoverment],
    }));
  }

  getById(id: string): CoGoverment {
    console.log(
      `🚀 ~ CoGovermentService ~ getById ~ this.coGoverments():`,
      this.coGoverments()
    );
    return this.coGoverments().filter((element) => element.id == id)[0];
  }
}
