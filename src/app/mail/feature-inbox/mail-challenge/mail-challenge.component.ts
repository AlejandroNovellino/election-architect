import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MailService } from '@mail-app/data/services/mail.service';
import { MailTableComponent } from '@mail-app/feature-inbox/mail-table/mail-table.component';

@Component({
  selector: 'app-mail-challenge',
  standalone: true,
  imports: [MailTableComponent],
  templateUrl: './mail-challenge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MailChallengeComponent {
  // services
  public mailService = inject(MailService);

  constructor() {}
}
