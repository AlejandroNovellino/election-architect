import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { Ballot, BallotShortInfo } from '../interfaces';

// state interface
interface BallotServiceState {
  ballots: BallotShortInfo[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BallotService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<BallotServiceState>({
    ballots: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public ballots = computed(() => this.#state().ballots);

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
      .get<BallotShortInfo[]>('assets/demo/data/short-info-ballots.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.set({
          ballots: res,
          loading: false,
        });
      });
  }

  createBallot(newBallot: Ballot) {
    // TODO call backend
    //TODO update the state with just the info that short ballot needs
    this.#state.update((lastState) => ({
      ...lastState,
      coGoverments: [...lastState.ballots, newBallot],
    }));
  }

  getById(id: string): BallotShortInfo {
    // TODO this should call the backend to get all the data of the ballot
    console.log(
      `🚀 ~ CoGovermentService ~ getById ~ this.coGoverments():`,
      this.ballots()
    );
    return this.ballots().filter((element) => element.id == id)[0];
  }
}
