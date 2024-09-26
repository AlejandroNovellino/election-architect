import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Office, ElectoralEvent } from '../interfaces';

// state interface
interface ElectoralEventsServiceState {
  electoralEvents: ElectoralEvent[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ElectoralEventsService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<ElectoralEventsServiceState>({
    electoralEvents: [],
    loading: true,
  });

  // signals to get the data
  public electoralEvents = computed(() => this.#state().electoralEvents);

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
    // get the elements from back
    this.httpClient
      .get<ElectoralEvent[]>('assets/demo/data/electoral-events.json')
      .subscribe((res) => {
        this.#state.set({
          electoralEvents: res,
          loading: false,
        });
      });
  }

  getById(id: string): ElectoralEvent {
    return this.electoralEvents().filter((element) => element.id == id)[0];
  }

  getChargesForElectoralEvent(electoralEventId: string) {
    // TODO this needs to get the elective offices for the given event based on the id
    // get the elements from back
    return this.httpClient.get<Office[]>(
      'assets/demo/data/electoral-events-offices.json'
    );
  }
}
