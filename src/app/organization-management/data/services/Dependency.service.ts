import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { Dependency } from './../interfaces';

// state interface
interface DependencyServiceState {
  dependencies: Dependency[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DependencyService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<DependencyServiceState>({
    dependencies: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  //public population = toObservable(computed(() => this.#state().populations));
  public dependencies = computed(() => this.#state().dependencies);

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
    // get the dependencies from back
    this.httpClient
      .get<Dependency[]>('assets/demo/data/dependencies.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.update((lastState) => ({
          ...lastState,
          dependencies: res,
          loading: false,
        }));
      });
  }

  addNewDependency(
    name: string,
    description: string,
    dependencyType: string,
    fatherDependency: string
  ) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      dependencies: [
        ...lastState.dependencies,
        {
          id: 10,
          name: name,
          description: description,
          type: dependencyType,
          fatherDependency: fatherDependency,
        },
      ],
    }));
  }
}
