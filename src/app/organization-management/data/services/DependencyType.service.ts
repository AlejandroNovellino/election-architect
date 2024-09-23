import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { DependencyType } from './../interfaces';

// state interface
interface DependencyTypeServiceState {
  dependenciesTypes: DependencyType[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DependencyTypeService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<DependencyTypeServiceState>({
    dependenciesTypes: [],
    loading: true,
  });

  // signals to get the data
  public dependenciesTypes = computed(() => this.#state().dependenciesTypes);

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
    // get the types of dependencies from back
    this.httpClient
      .get<DependencyType[]>('assets/demo/data/dependencies-types.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(250))
      .subscribe((res) => {
        this.#state.update((lastState) => ({
          ...lastState,
          dependenciesTypes: res,
          loading: false,
        }));
      });
  }

  addNewDependencyType(name: string, description: string) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      dependenciesTypes: [
        ...lastState.dependenciesTypes,
        {
          id: 10,
          name: name,
          description: description,
        },
      ],
    }));
  }
}
