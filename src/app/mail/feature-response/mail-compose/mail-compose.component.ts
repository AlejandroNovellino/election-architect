import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Mail } from '@mail-app/data/interfaces/mail';
import { ReplyToMessageService } from '@mail-app/data/services/reply-to-message.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-mail-compose',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, EditorModule],
  providers: [MessageService],
  templateUrl: './mail-compose.component.html',
})
export default class MailComposeComponent {
  // services injected
  replyToMailService: ReplyToMessageService = inject(ReplyToMessageService);
  // variables
  newMail: Mail = {
    id: '',
    to: '',
    email: '',
    image: '',
    title: '',
    message: '',
    date: '',
    important: false,
    starred: false,
    trash: false,
    spam: false,
    archived: false,
    sent: true,
  };

  constructor(
    private messageService: MessageService,
    private location: Location,
    private router: Router
  ) {}

  sendMail() {
    if (this.newMail.message) {
      this.newMail.id = Math.floor(Math.random() * 1000);
      this.replyToMailService.onSend(this.newMail);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Mail sent',
      });
      this.router.navigate(['apps/mail/inbox']);
    }
  }

  goBack() {
    this.location.back();
  }
}
