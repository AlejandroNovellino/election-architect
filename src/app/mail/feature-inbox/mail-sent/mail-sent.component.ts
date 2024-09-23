import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MailService } from '@mail-app/data/services/mail.service';
import { MailSentTableComponent } from '@mail-app/feature-inbox/mail-sent-table/mail-sent-table.component';

@Component({
  selector: 'app-mail-sent',
  standalone: true,
  imports: [MailSentTableComponent],
  templateUrl: './mail-sent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MailSentComponent {
  // services
  public mailService = inject(MailService);

  constructor() {}
}
