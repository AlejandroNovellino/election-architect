import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MailService } from '@mail-app/data/services/mail.service';
import { MailTableComponent } from '@mail-app/feature-inbox/mail-table/mail-table.component';

@Component({
  selector: 'app-mail-spam',
  standalone: true,
  imports: [MailTableComponent],
  templateUrl: './mail-spam.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MailSpamComponent {
  // services
  public mailService = inject(MailService);

  constructor() {}
}
