import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MailSidebarComponent } from '@mail-app/ui/mail-sidebar/mail-sidebar.component';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [RouterOutlet, MailSidebarComponent, ToastModule, MessagesModule],
  providers: [MessageService],
  templateUrl: './mail.component.html',
})
export default class MailComponent {}
