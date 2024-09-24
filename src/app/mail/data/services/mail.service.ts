import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Mail, MailResponse } from '@mail-app/data/interfaces/mail';
import { requestStatusMapper, requestTypeMapper } from '@mail-app/util';
import { delay } from 'rxjs';
import { RequestStatusEnum, RequestTypeEnum } from './../enums';

interface MailServiceState {
  mails: Mail[] | any[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MailService {
  // services injected
  private httpClient = inject(HttpClient);

  // state
  #state = signal<MailServiceState>({
    mails: Array.from({ length: 5 }).map((_, i) => ({})),
    loading: true,
  });

  // signals to get the data
  public allMails = computed<Mail[]>(() => this.#state().mails);

  public loading = computed(() => this.#state().loading);

  public inboxMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (d) => !d.archived && !d.spam && !d.trash && !d.sent
    )
  );

  public archivedMails = computed(() =>
    this.#state().mails.filter((d) => d.archived)
  );

  public candidatureMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (mail) =>
        !mail.archived &&
        !mail.spam &&
        !mail.trash &&
        !mail.sent &&
        mail.requestType === RequestTypeEnum.Candidature
    )
  );

  public challengeMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (mail) =>
        !mail.archived &&
        !mail.spam &&
        !mail.trash &&
        !mail.sent &&
        mail.requestType === RequestTypeEnum.Challenge
    )
  );

  public complaintMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (mail) =>
        !mail.archived &&
        !mail.spam &&
        !mail.trash &&
        !mail.sent &&
        mail.requestType === RequestTypeEnum.Complaint
    )
  );

  public importantMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (d) => d.important && !d.spam && !d.trash && !d.archived
    )
  );

  public sentMails = computed<Mail[]>(() =>
    this.#state().mails.filter((d) => d.sent && !d.trash && !d.archived)
  );

  public spamMails = computed<Mail[]>(() =>
    this.#state().mails.filter(
      (d) => d.spam && !d.archived && !d.trash && !d.hasOwnProperty('sent')
    )
  );

  public starredMails = computed<Mail[]>(() =>
    this.#state().mails.filter((d) => d.starred && !d.archived && !d.trash)
  );

  public trashMails = computed<Mail[]>(() =>
    this.#state().mails.filter((d) => d.trash)
  );

  public amountOfNewMails = computed<string>(() => {
    // get the amount of mails
    let amountOfNewMails: number = 0;

    for (let mail of this.#state().mails) {
      if (!mail.read && !mail.trash) {
        amountOfNewMails += 1;
      }
    }

    // set the value of the variable to count the mails
    if (amountOfNewMails) {
      return amountOfNewMails > 10 ? '10+' : `${amountOfNewMails}`;
    } else {
      return '';
    }
  });

  public mailBadgeValues = computed(() => {
    let inbox = [],
      starred = [],
      spam = [],
      important = [],
      archived = [],
      //trash = [],
      //sent = [],
      candidatures = [],
      challenges = [],
      complaints = [];

    for (let mail of this.#state().mails) {
      // verifies if the mail was read to continue
      if (mail.read) {
        continue;
      }
      if (!mail.archived && !mail.trash && !mail.spam && !mail.sent) {
        inbox.push(mail);
      }
      if (mail.starred && !mail.archived && !mail.trash) {
        starred.push(mail);
      }
      if (mail.spam && !mail.archived && !mail.trash) {
        spam.push(mail);
      }
      if (mail.important && !mail.archived && !mail.trash) {
        important.push(mail);
      }
      if (mail.archived && !mail.trash) {
        archived.push(mail);
      }
      /*
        trash mails should not be counted
        if (mail.trash) {
          trash.push(mail);
        }
        sent mails should not be counted
        if (mail.sent && !mail.archived && !mail.trash) {
          sent.push(mail);
        }
          */
      // count candidatures
      if (
        mail.requestType === RequestTypeEnum.Candidature &&
        !mail.archived &&
        !mail.trash &&
        !mail.spam
      ) {
        candidatures.push(mail);
      }
      // count challenges
      if (
        mail.requestType === RequestTypeEnum.Challenge &&
        !mail.archived &&
        !mail.trash &&
        !mail.spam
      ) {
        challenges.push(mail);
      }
      // count complaints
      if (
        mail.requestType === RequestTypeEnum.Complaint &&
        !mail.archived &&
        !mail.trash &&
        !mail.spam
      ) {
        complaints.push(mail);
      }
    }

    return {
      inbox: inbox.length.toString(),
      starred: starred.length.toString(),
      spam: spam.length.toString(),
      important: important.length.toString(),
      archived: archived.length.toString(),
      //trash: trash.length,
      //sent: sent.length,
      candidatures: candidatures.length.toString(),
      challenges: challenges.length.toString(),
      complaints: complaints.length.toString(),
    };
  });

  // methods -----------------------------------------------
  constructor() {
    // ge the data
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
      .get<MailResponse>('assets/demo/data/mail.json')
      // TODO delete the delay, the delay is for testing
      .pipe(delay(500))
      .subscribe((res) => {
        this.#state.update((lastState) => ({
          ...lastState,
          mails: [...this.orderMailsFromReceivedDate(res.data)],
          loading: false,
        }));
      });
  }

  orderMailsFromReceivedDate(mails: Mail[]): Mail[] {
    // copy of the array
    let orderedMails: Mail[] = [...mails];
    orderedMails.sort((firstMail, secondMail) => {
      if (
        Date.parse(firstMail.date as string) <
        Date.parse(secondMail.date as string)
      ) {
        return 1;
      } else if (
        Date.parse(firstMail.date as string) >
        Date.parse(secondMail.date as string)
      ) {
        return -1;
      } else {
        return 0;
      }
    });

    return orderedMails;
  }

  onStar(id: number) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [
        ...lastState.mails.map((m) =>
          m.id === id ? { ...m, starred: !m.starred } : m
        ),
      ],
    }));
  }

  onArchive(id: number) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [
        ...lastState.mails.map((m) =>
          m.id === id ? { ...m, archived: !m.archived } : m
        ),
      ],
    }));
  }

  onBookmark(id: number) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [
        ...lastState.mails.map((m) =>
          m.id === id ? { ...m, important: !m.important } : m
        ),
      ],
    }));
  }

  onDelete(id: number) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [...lastState.mails.filter((m) => m.id !== id)],
    }));
  }

  onDeleteMultiple(mails: Mail[]) {
    // arrays of ids to delete
    let idArray = mails.map((m) => Number(m.id));
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [...lastState.mails.filter((m) => idArray.indexOf(m.id) == -1)],
    }));
  }

  onArchiveMultiple(mails: Mail[]) {
    // aux array
    let auxMails = this.#state().mails;
    // arrays of ids
    let idArray = mails.map((m) => m.id);
    // filter the array
    for (let i = 0; i < this.#state().mails.length; i++) {
      let mail = this.#state().mails[i];

      if (idArray.indexOf(mail.id) !== -1) {
        mail.archived = true;
        auxMails[i] = mail;
      }
    }

    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [...auxMails],
    }));
  }

  onSpamMultiple(mails: Mail[]) {
    // aux array
    let auxMails = this.#state().mails;
    // arrays of ids
    let idArray = mails.map((m) => m.id);
    // filter the array
    for (let i = 0; i < this.#state().mails.length; i++) {
      let mail = this.#state().mails[i];

      if (idArray.indexOf(mail.id) !== -1) {
        mail = {
          ...mail,
          spam: true,
          important: false,
          starred: false,
          archived: false,
        };
        auxMails[i] = mail;
      }
    }

    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [...auxMails],
    }));
  }

  onTrash(id: number) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [
        ...lastState.mails.map((m) =>
          m.id === id ? { ...m, trash: true } : m
        ),
      ],
    }));
  }

  onRead(id: any) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [
        ...lastState.mails.map((m) => (m.id === id ? { ...m, read: true } : m)),
      ],
    }));
  }

  addNewMail(newMail: Mail) {
    // this should call backend
    // then update the state
    this.#state.update((lastState) => ({
      ...lastState,
      mails: [...lastState.mails, newMail],
    }));
  }

  getRequestTypeColor(requestType: String | undefined) {
    switch (requestType) {
      case RequestTypeEnum.Challenge:
        return 'bg-challenge';
      case RequestTypeEnum.Candidature:
        return 'bg-candidature';
      case RequestTypeEnum.Complaint:
        return 'bg-complaint';
      default:
        return 'bg-without-type';
    }
  }

  getRequestTypeValueToDisplay(requestType: string | undefined) {
    return requestTypeMapper(requestType);
  }

  getRequestTypeSeverity(status: string) {
    switch (status) {
      case RequestTypeEnum.Candidature:
        return 'info';

      case RequestTypeEnum.Challenge:
        return 'warning';

      case RequestTypeEnum.Complaint:
        return 'danger';

      default:
        return 'contrast';
    }
  }

  getRequestStatusValueToDisplay(requestStatus: string | undefined) {
    return requestStatusMapper(requestStatus);
  }

  getRequestStatusBackgroundColor(requestStatus: String | undefined) {
    switch (requestStatus) {
      case RequestStatusEnum.Pending:
        return 'var(--ucab-carrot-orange)';
      case RequestStatusEnum.Rejected:
        return 'var(--ucab-thunderbird-red)';
      case RequestStatusEnum.Disapproved:
        return 'var(--ucab-thunderbird-red)';
      case RequestStatusEnum.Approved:
        return 'var(--ucab-jade-green)';
      case RequestStatusEnum.Processing:
        return 'var(--ucab-persian-green)';
      default:
        return 'contrast';
    }
  }

  getMailById(mailId: number): Mail {
    return this.#state().mails.filter((d) => d.id == mailId)[0];
  }
}
