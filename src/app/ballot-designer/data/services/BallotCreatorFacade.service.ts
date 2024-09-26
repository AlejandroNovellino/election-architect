import { computed, inject, Injectable } from '@angular/core';
import { Ballot, Office } from '../interfaces';
import { BallotService } from './Ballot.service';
import { ElectoralEventsService } from './ElectoralEvents.service';

@Injectable({
  providedIn: 'root',
})
export class BallotCreatorFacadeService {
  // services injected
  private readonly ballotService = inject(BallotService);
  private readonly electoralEventsService = inject(ElectoralEventsService);

  // signals to get the data
  public electoralEvents = computed(() =>
    this.electoralEventsService.electoralEvents()
  );

  public loading = computed(() => {
    return this.electoralEventsService.loading();
  });

  constructor() {
    // get the data
    this.getData();
  }

  getData(): void {
    // get the data from the services
    this.electoralEventsService.getData();
  }

  createBallot(newBallotData: Ballot) {
    // add the new co-goverment
    this.ballotService.createBallot(newBallotData);
  }

  getChargesForElectoralEvent(electoralEventId: string) {
    return this.electoralEventsService.getChargesForElectoralEvent(
      electoralEventId
    );
  }
}
